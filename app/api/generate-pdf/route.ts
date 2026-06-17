import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer';

export const maxDuration = 60; // Next.js API Route max execution time

export async function POST(req: Request) {
  try {
    const { clientId, userId } = await req.json();

    if (!clientId) {
      return NextResponse.json({ error: 'Missing clientId' }, { status: 400 });
    }

    // Determine base URL dynamically based on environment
    const isLocal = process.env.NODE_ENV === 'development';
    const protocol = isLocal ? 'http' : 'https';
    const host = req.headers.get('host') || process.env.VERCEL_URL || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    const targetUrl = `${baseUrl}/report/${clientId}`;

    console.log(`Generating PDF for ${targetUrl}`);

    let browser;
    if (isLocal) {
      // Use standard puppeteer for local development (Windows/Mac)
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    } else {
      // Use @sparticuz/chromium + puppeteer-core for Vercel Serverless
      browser = await puppeteerCore.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    }

    const page = await browser.newPage();
    
    // Set viewport to A4 dimensions approximately for better rendering context
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    
    // Navigate and wait for network to be idle so charts render fully. Using networkidle2 to prevent Next.js HMR websocket from causing timeouts
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
      displayHeaderFooter: false, // We built custom header/footers in HTML
    });

    await browser.close();

    // Log to Supabase client_reports table if userId is provided
    if (userId) {
      const { error } = await supabase.from('client_reports').insert({
        client_id: clientId,
        generated_by: userId,
        report_version: '1.0'
      });
      if (error) {
        console.error("Failed to log report generation to Supabase", error);
      }
    }

    // Return PDF as buffer
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="FINZAVIO-Report-${new Date().toISOString().split('T')[0]}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error('PDF Generation Error:', error);
    require('fs').writeFileSync('pdf-error.log', String(error.stack || error.message));
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    );
  }
}
