"use server"

import { supabaseAdmin } from "@/lib/supabase-admin"

//
// 1. CREATE CLIENT — Full Registration Form
//
export async function createClientAccount(formData: FormData) {
  try {
    // ── Mandatory fields ──
    const name            = (formData.get("name") as string)?.trim()
    const mobileNumber    = (formData.get("mobile_number") as string)?.trim()
    const servicesRequired = formData.get("services_required") as string
    const nomineeName     = (formData.get("nominee_name") as string)?.trim()
    const nomineeRel      = (formData.get("nominee_relationship") as string)?.trim()

    if (!name)            return { error: "Full Name is required." }
    if (!mobileNumber)    return { error: "Mobile Number is required." }
    if (!servicesRequired) return { error: "At least one service must be selected." }
    if (!nomineeName)     return { error: "Nominee Name is required." }
    if (!nomineeRel)      return { error: "Nominee Relationship is required." }

    // ── Base Optional fields ──
    const email             = (formData.get("email") as string)?.trim() || ""
    const whatsappNumber    = (formData.get("whatsapp_number") as string)?.trim() || ""
    const dateOfBirth       = formData.get("date_of_birth") as string || ""
    const city              = (formData.get("city") as string)?.trim() || ""
    const notes             = (formData.get("notes") as string)?.trim() || ""
    const singleEarning     = formData.get("single_earning_member") === "true"

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) return { error: "Invalid email format." }
    }

    // ── Build Base Profile Object ──
    const profileData: Record<string, any> = {
      name,
      role: "client",
      mobile_number: mobileNumber,
      services_required: servicesRequired,
      nominee_name: nomineeName,
      nominee_relationship: nomineeRel,
      single_earning_member: singleEarning,
      whatsapp_number: whatsappNumber || null,
      date_of_birth: dateOfBirth || null,
      city: city || null,
      notes: notes || null,
    }

    // ── ADVANCED FIELDS EXTRACTION ──
    
    // Income
    const num = (v: any) => v && !isNaN(Number(v)) ? Number(v) : null;
    
    profileData.monthly_income_self = num(formData.get("monthly_income_self"))
    profileData.monthly_income_spouse = num(formData.get("monthly_income_spouse"))
    profileData.other_income = num(formData.get("other_income"))
    profileData.monthly_income = num(formData.get("monthly_income")) // auto-calculated total
    profileData.monthly_expenses = num(formData.get("monthly_expenses"))
    profileData.emi_outflow = num(formData.get("emi_outflow"))

    // Family Resp
    profileData.number_of_dependents = num(formData.get("number_of_dependents")) || 0
    profileData.dependent_type = formData.get("dependent_type") as string || null
    profileData.elderly_parents_dependent = formData.get("elderly_parents_dependent") === "true"
    profileData.child_education_responsibility = formData.get("child_education_responsibility") === "true"

    // Assets
    profileData.bank_savings = num(formData.get("bank_savings"))
    profileData.fd_rd_value = num(formData.get("fd_rd_value"))
    profileData.mutual_fund_value = num(formData.get("mutual_fund_value"))
    profileData.stocks_value = num(formData.get("stocks_value"))
    profileData.gold_value = num(formData.get("gold_value"))
    profileData.real_estate_value = num(formData.get("real_estate_value"))
    profileData.other_assets = num(formData.get("other_assets"))

    // Liabilities
    profileData.home_loan_outstanding = num(formData.get("home_loan_outstanding"))
    profileData.personal_loan = num(formData.get("personal_loan"))
    profileData.vehicle_loan = num(formData.get("vehicle_loan"))
    profileData.credit_card_outstanding = num(formData.get("credit_card_outstanding"))
    profileData.other_liabilities = num(formData.get("other_liabilities"))

    // Protection Planning
    profileData.existing_insurance_cover = formData.get("existing_insurance_cover") === "true"
    profileData.health_insurance_available = formData.get("health_insurance_available") === "true"
    profileData.health_insurance_amount = num(formData.get("health_insurance_amount"))
    profileData.life_insurance_available = formData.get("life_insurance_available") === "true"
    profileData.life_insurance_amount = num(formData.get("life_insurance_amount"))
    profileData.critical_illness_cover = formData.get("critical_illness_cover") === "true"
    profileData.family_covered = formData.get("family_covered") === "true"

    // Investment Profile
    profileData.existing_sip = formData.get("existing_sip") === "true"
    profileData.sip_amount = num(formData.get("sip_amount"))
    profileData.direct_stocks = formData.get("direct_stocks") === "true"
    profileData.pms_aif = formData.get("pms_aif") === "true"
    profileData.retirement_corpus_started = formData.get("retirement_corpus_started") === "true"
    profileData.emergency_fund_available = formData.get("emergency_fund_available") === "true"

    // Goals (JSON Array)
    const rawGoals = formData.get("advanced_financial_goals") as string
    if (rawGoals) {
      try {
        const parsed = JSON.parse(rawGoals)
        profileData.advanced_financial_goals = parsed
      } catch(e) {}
    }

    // Risk
    profileData.risk_profile = formData.get("risk_profile") as string || null
    profileData.investment_horizon = formData.get("investment_horizon") as string || null
    profileData.market_fall_tolerance = formData.get("market_fall_tolerance") as string || null
    profileData.investment_experience = formData.get("investment_experience") as string || null


    // ── If email provided → create auth user ──
    if (email) {
      const tempPassword = Math.random().toString(36).slice(-10) + "A1!"

      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { name }
      })

      if (authError) return { error: authError.message }

      profileData.id = authData.user.id

      const { error: profileError } = await supabaseAdmin.from("profiles").upsert(profileData)
      if (profileError) {
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
        console.error("Profile creation error:", profileError)
        return { error: `Failed to create profile: ${profileError.message}. System rolled back.` }
      }
    } else {
      // No email → profile-only record (no auth login)
      const { error: profileError } = await supabaseAdmin.from("profiles").insert(profileData)
      if (profileError) {
        console.error("Profile insert error:", profileError)
        return { error: profileError.message || "Failed to create client profile." }
      }
    }

    return { success: true, message: `Client '${name}' registered successfully.` }

  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." }
  }
}

//
// 1.5 UPDATE CLIENT
//
export async function updateClientAccount(id: string, formData: FormData) {
  try {
    const name            = (formData.get("name") as string)?.trim()
    const mobileNumber    = (formData.get("mobile_number") as string)?.trim()
    const servicesRequired = formData.get("services_required") as string
    const nomineeName     = (formData.get("nominee_name") as string)?.trim()
    const nomineeRel      = (formData.get("nominee_relationship") as string)?.trim()

    if (!name)            return { error: "Full Name is required." }
    if (!mobileNumber)    return { error: "Mobile Number is required." }
    if (!servicesRequired) return { error: "At least one service must be selected." }

    const whatsappNumber    = (formData.get("whatsapp_number") as string)?.trim() || ""
    const dateOfBirth       = formData.get("date_of_birth") as string || ""
    const city              = (formData.get("city") as string)?.trim() || ""
    const notes             = (formData.get("notes") as string)?.trim() || ""
    const singleEarning     = formData.get("single_earning_member") === "true"

    const profileData: Record<string, any> = {
      name,
      mobile_number: mobileNumber,
      services_required: servicesRequired,
      nominee_name: nomineeName,
      nominee_relationship: nomineeRel,
      single_earning_member: singleEarning,
      whatsapp_number: whatsappNumber || null,
      date_of_birth: dateOfBirth || null,
      city: city || null,
      notes: notes || null,
    }

    // ── ADVANCED FIELDS EXTRACTION ──
    const num = (v: any) => v && !isNaN(Number(v)) ? Number(v) : null;
    
    // Income
    profileData.monthly_income_self = num(formData.get("monthly_income_self"))
    profileData.monthly_income_spouse = num(formData.get("monthly_income_spouse"))
    profileData.other_income = num(formData.get("other_income"))
    profileData.monthly_income = num(formData.get("monthly_income")) // auto-calculated total
    profileData.monthly_expenses = num(formData.get("monthly_expenses"))
    profileData.emi_outflow = num(formData.get("emi_outflow"))

    // Family Resp
    profileData.number_of_dependents = num(formData.get("number_of_dependents")) || 0
    profileData.dependent_type = formData.get("dependent_type") as string || null
    profileData.elderly_parents_dependent = formData.get("elderly_parents_dependent") === "true"
    profileData.child_education_responsibility = formData.get("child_education_responsibility") === "true"

    // Assets
    profileData.bank_savings = num(formData.get("bank_savings"))
    profileData.fd_rd_value = num(formData.get("fd_rd_value"))
    profileData.mutual_fund_value = num(formData.get("mutual_fund_value"))
    profileData.stocks_value = num(formData.get("stocks_value"))
    profileData.gold_value = num(formData.get("gold_value"))
    profileData.real_estate_value = num(formData.get("real_estate_value"))
    profileData.other_assets = num(formData.get("other_assets"))

    // Liabilities
    profileData.home_loan_outstanding = num(formData.get("home_loan_outstanding"))
    profileData.personal_loan = num(formData.get("personal_loan"))
    profileData.vehicle_loan = num(formData.get("vehicle_loan"))
    profileData.credit_card_outstanding = num(formData.get("credit_card_outstanding"))
    profileData.other_liabilities = num(formData.get("other_liabilities"))

    // Protection Planning
    profileData.existing_insurance_cover = formData.get("existing_insurance_cover") === "true"
    profileData.health_insurance_available = formData.get("health_insurance_available") === "true"
    profileData.health_insurance_amount = num(formData.get("health_insurance_amount"))
    profileData.life_insurance_available = formData.get("life_insurance_available") === "true"
    profileData.life_insurance_amount = num(formData.get("life_insurance_amount"))
    profileData.critical_illness_cover = formData.get("critical_illness_cover") === "true"
    profileData.family_covered = formData.get("family_covered") === "true"

    // Investment Profile
    profileData.existing_sip = formData.get("existing_sip") === "true"
    profileData.sip_amount = num(formData.get("sip_amount"))
    profileData.direct_stocks = formData.get("direct_stocks") === "true"
    profileData.pms_aif = formData.get("pms_aif") === "true"
    profileData.retirement_corpus_started = formData.get("retirement_corpus_started") === "true"
    profileData.emergency_fund_available = formData.get("emergency_fund_available") === "true"

    // Goals (JSON Array)
    const rawGoals = formData.get("advanced_financial_goals") as string
    if (rawGoals) {
      try {
        const parsed = JSON.parse(rawGoals)
        profileData.advanced_financial_goals = parsed
      } catch(e) {}
    } else {
        profileData.advanced_financial_goals = null
    }

    // Risk
    profileData.risk_profile = formData.get("risk_profile") as string || null
    profileData.investment_horizon = formData.get("investment_horizon") as string || null
    profileData.market_fall_tolerance = formData.get("market_fall_tolerance") as string || null
    profileData.investment_experience = formData.get("investment_experience") as string || null

    const { error } = await supabaseAdmin.from("profiles").update(profileData).eq("id", id)
    if (error) return { error: error.message }
    return { success: true, message: "Client updated successfully." }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." }
  }
}

//
// 1.6 DELETE CLIENT
//
export async function deleteClientAccount(id: string) {
  try {
    const { data: userData } = await supabaseAdmin.auth.admin.getUserById(id);
    if (userData?.user) {
      const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
      if (authError) return { error: authError.message }
    } else {
      const { error: profileError } = await supabaseAdmin.from("profiles").delete().eq("id", id);
      if (profileError) return { error: profileError.message }
    }
    return { success: true, message: "Client deleted successfully." }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." }
  }
}

//
// 2. GET ALL PROFILES
//
export async function getAllProfiles() {
  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .order("role", { ascending: true })
      .order("created_at", { ascending: false })

    if (error) throw new Error(error.message)

    const { data: authUsersData } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
    const emailMap = new Map<string, string>()
    if (authUsersData?.users) {
      for (const u of authUsersData.users) {
        if (u.email) emailMap.set(u.id, u.email)
      }
    }

    const enriched = (data || []).map(profile => ({
      ...profile,
      email: emailMap.get(profile.id) || null
    }))

    return { data: enriched, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}
