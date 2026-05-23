const fs = require('fs');
let code = fs.readFileSync('app/admin/clients/page.tsx', 'utf8');

// Add import
if (!code.includes('import PdfGeneratorModal')) {
  code = code.replace('import ClientForm from "@/components/ClientForm";', 'import ClientForm from "@/components/ClientForm";\nimport PdfGeneratorModal from "@/components/PdfGeneratorModal";');
}

// Add state
if (!code.includes('const [pdfClient, setPdfClient]')) {
  code = code.replace('const [deletingClientId, setDeletingClientId] = useState<string | null>(null);', 'const [deletingClientId, setDeletingClientId] = useState<string | null>(null);\n  const [pdfClient, setPdfClient] = useState<any | null>(null);');
}

// Add button
const targetButtonBlock = `<button onClick={() => setDeletingClientId(client.id)} title="Delete Client" className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>`;
const replacementButtonBlock = `<button onClick={() => setDeletingClientId(client.id)} title="Delete Client" className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                          <button onClick={() => setPdfClient(client)} title="Generate PDF" className="p-2.5 bg-[#191970] text-white hover:bg-[#111150] rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"><FileText className="w-4 h-4" /><span className="text-[11px] font-bold uppercase tracking-wider hidden xl:inline">Generate PDF</span></button>`;
code = code.replace(targetButtonBlock, replacementButtonBlock);

// Add modal component at the bottom before closing div
const modalBlock = `{pdfClient && (
        <PdfGeneratorModal 
          client={pdfClient} 
          onClose={() => setPdfClient(null)} 
        />
      )}`;
code = code.replace('{/* ── DELETE MODAL ── */}', modalBlock + '\n\n      {/* ── DELETE MODAL ── */}');

fs.writeFileSync('app/admin/clients/page.tsx', code);
console.log("Updated clients page with PDF modal and buttons.");
