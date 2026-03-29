"use server"

import { supabaseAdmin } from "@/lib/supabase-admin"

//
// 1. CREATE CLIENT
//
export async function createClientAccount(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string
    const serviceType = formData.get("service_type") as string
    const investedFundStr = formData.get("invested_fund") as string

    if (!email || !password || !name) {
      return { error: "Missing required fields." }
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { error: "Invalid email format." }
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters." }
    }

    const investedFund = parseFloat(investedFundStr || "0")

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: { name: name }
    })

    if (authError) {
      return { error: authError.message }
    }

    const userId = authData.user.id

    const { error: profileError } = await supabaseAdmin.from("profiles").upsert({
      id: userId,
      name: name,
      role: "client",
      service_type: serviceType,
      invested_fund: investedFund,
    })

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(userId)
      return { error: "Failed to create profile. System rolled back." }
    }

    return { success: true, message: `Client '${name}' created successfully.` }
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." }
  }
}

//
// 2. GET ALL PROFILES (Admins and Clients)
//
export async function getAllProfiles() {
  try {
    // We fetch all records, admins included, ordered so admins are listed first
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .order("role", { ascending: true }) // 'admin' comes before 'client' alphabetically
      .order("created_at", { ascending: false })

    if (error) throw new Error(error.message)
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

//
// 3. DELETE CLIENT
//
export async function deleteClientAction(userId: string) {
  try {
    if (!userId) return { error: "Missing user ID." }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
    
    if (error) throw new Error(error.message)
    
    return { success: true, message: "Client permanently deleted." }
  } catch (error: any) {
    return { error: error.message || "Failed to delete client." }
  }
}

//
// 4. RESET CLIENT PASSWORD
//
export async function resetClientPasswordAction(userId: string, newPassword: string) {
  try {
    if (!userId || !newPassword) {
      return { error: "Missing ID or password." }
    }

    if (newPassword.length < 6) {
      return { error: "Password must be at least 6 characters." }
    }

    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: newPassword,
    })

    if (error) throw new Error(error.message)
      
    return { success: true, message: "Password reset correctly." }
  } catch (error: any) {
    return { error: error.message || "Failed to reset password." }
  }
}

//
// 5. UPDATE CLIENT PLAN
//
export async function updateClientPlanAction(userId: string, newPlan: string) {
  try {
    if (!userId || !newPlan) {
      return { error: "Missing required fields." }
    }

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ service_type: newPlan })
      .eq("id", userId);

    if (error) throw new Error(error.message);
    
    return { success: true, message: "Strategy plan updated successfully." }
  } catch (error: any) {
    return { error: error.message || "Failed to update strategy plan." }
  }
}

//
// 6. ADD WEEKLY PERFORMANCE
//
export async function addWeeklyPerformanceAction(formData: FormData) {
  try {
    const userId = formData.get("user_id") as string;
    const profitAmount = parseFloat(formData.get("profit") as string);

    if (!userId || isNaN(profitAmount)) {
      return { error: "Missing or invalid data." }
    }

    const { data: lastRecord } = await supabaseAdmin
      .from("performance")
      .select("week")
      .eq("user_id", userId)
      .order("week", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextWeekNumber = (lastRecord?.week || 0) + 1;

    const { error } = await supabaseAdmin
      .from("performance")
      .insert({
        user_id: userId,
        week: nextWeekNumber,
        year: new Date().getFullYear(),
        profit: profitAmount
      });

    if (error) throw new Error(error.message);
    
    return { success: true, message: "Performance logged successfully." }
  } catch (error: any) {
    return { error: error.message || "Failed to log weekly performance." }
  }
}

//
// 7. UPDATE CLIENT CAPITAL
//
export async function updateClientCapitalAction(userId: string, amount: number) {
  try {
    if (!userId || isNaN(amount)) {
      return { error: "Missing or invalid data." }
    }

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ invested_fund: amount })
      .eq("id", userId);

    if (error) throw new Error(error.message);
    
    return { success: true, message: "Client capital balance updated successfully." }
  } catch (error: any) {
    return { error: error.message || "Failed to update capital balance." }
  }
}
