export function generateReportData(clientData: any) {
  // 1. Core Financial Numbers
  const incSelf = Number(clientData.monthly_income_self) || 0;
  const incSpouse = Number(clientData.monthly_income_spouse) || 0;
  const incOther = Number(clientData.other_income) || 0;
  const totalIncome = incSelf + incSpouse + incOther;

  const expMonthly = Number(clientData.monthly_expenses) || 0;
  const expEmi = Number(clientData.emi_outflow) || 0;
  const totalOutflow = expMonthly + expEmi;

  const savingsCapacity = totalIncome - totalOutflow;
  const savingsRatio = totalIncome > 0 ? (savingsCapacity / totalIncome) * 100 : 0;
  const emiBurdenRatio = totalIncome > 0 ? (expEmi / totalIncome) * 100 : 0;

  const astBank = Number(clientData.bank_savings) || 0;
  const astFd = Number(clientData.fd_rd_value) || 0;
  const astMf = Number(clientData.mutual_fund_value) || 0;
  const astStocks = Number(clientData.stocks_value) || 0;
  const astGold = Number(clientData.gold_value) || 0;
  const astRe = Number(clientData.real_estate_value) || 0;
  const astOther = Number(clientData.other_assets) || 0;
  const totalAssets = astBank + astFd + astMf + astStocks + astGold + astRe + astOther;
  const liquidAssets = astBank + astFd + astMf + astStocks;

  const liaHome = Number(clientData.home_loan_outstanding) || 0;
  const liaPersonal = Number(clientData.personal_loan) || 0;
  const liaVehicle = Number(clientData.vehicle_loan) || 0;
  const liaCc = Number(clientData.credit_card_outstanding) || 0;
  const liaOther = Number(clientData.other_liabilities) || 0;
  const totalLiabilities = liaHome + liaPersonal + liaVehicle + liaCc + liaOther;

  const netWorth = totalAssets - totalLiabilities;

  // 2. Flags & Toggles
  const singleEarning = !!clientData.single_earning_member;
  const hasDependents = Number(clientData.number_of_dependents) > 0;
  const hasLifeIns = !!clientData.life_insurance_available || !!clientData.life_insurance_amount;
  const hasHealthIns = !!clientData.health_insurance_available || !!clientData.health_insurance_amount;
  const hasEmergencyFund = !!clientData.emergency_fund_available;

  // 3. FINZAVIO Wellness Score Calculation (Max 100)
  let wellnessScore = 0;
  
  // Savings (Max 25)
  if (savingsRatio >= 30) wellnessScore += 25;
  else if (savingsRatio >= 20) wellnessScore += 18;
  else if (savingsRatio >= 10) wellnessScore += 10;
  else if (savingsRatio > 0) wellnessScore += 5;

  // Debt Burden (Max 20)
  if (emiBurdenRatio === 0) wellnessScore += 20;
  else if (emiBurdenRatio <= 30) wellnessScore += 15;
  else if (emiBurdenRatio <= 40) wellnessScore += 10;
  else if (emiBurdenRatio <= 50) wellnessScore += 5;

  // Emergency Fund (Max 15)
  if (hasEmergencyFund || liquidAssets >= expMonthly * 6) wellnessScore += 15;
  else if (liquidAssets >= expMonthly * 3) wellnessScore += 8;

  // Protection (Max 20)
  if (hasHealthIns) wellnessScore += 10;
  if (hasLifeIns) wellnessScore += 10;
  else if (!singleEarning && !hasDependents) wellnessScore += 5; // Less penalization if no dependents

  // Investments (Max 20)
  if (clientData.existing_sip || clientData.mutual_fund_value > 0) wellnessScore += 10;
  if (clientData.retirement_corpus_started) wellnessScore += 10;

  // Calculate Rating
  let wellnessRating = "Poor";
  if (wellnessScore >= 85) wellnessRating = "Excellent";
  else if (wellnessScore >= 70) wellnessRating = "Good";
  else if (wellnessScore >= 50) wellnessRating = "Average";
  else if (wellnessScore >= 35) wellnessRating = "Below Average";

  // 4. Deterministic Text Generation (Rule-based)
  const observations: string[] = [];

  // EMI Rule
  if (emiBurdenRatio > 40) {
    observations.push("EMI burden appears relatively high and may reduce long-term financial flexibility.");
  } else if (emiBurdenRatio > 0 && emiBurdenRatio <= 30) {
    observations.push("Debt-to-income ratio is within healthy ranges, allowing for steady cash flow management.");
  } else if (emiBurdenRatio === 0) {
    observations.push("Zero EMI burden provides excellent monthly cash flow surplus for wealth creation.");
  }

  // Emergency Fund Rule
  if (!hasEmergencyFund && liquidAssets < (expMonthly * 3)) {
    observations.push("Emergency reserve appears below ideal comfort levels. Establishing a liquid buffer is a recommended priority.");
  } else {
    observations.push("Adequate liquidity or emergency reserves appear to be present for short-term contingencies.");
  }

  // Savings Rule
  if (savingsRatio < 10 && savingsRatio >= 0) {
    observations.push("Current monthly savings capacity appears constrained. Reviewing fixed expenses may create additional wealth-building capacity.");
  } else if (savingsRatio >= 30) {
    observations.push("Strong savings ratio observed, indicating excellent potential for achieving long-term financial goals.");
  }

  // Protection Rule
  if (singleEarning && hasDependents && !hasLifeIns) {
    observations.push("Family dependency structure indicates a higher protection priority, given the single-earning member status and lack of life insurance coverage.");
  } else if (!hasHealthIns) {
    observations.push("Absence of dedicated health insurance coverage leaves the portfolio exposed to potential medical inflation shocks.");
  }

  // Retirement/Investment Rule
  if (!clientData.retirement_corpus_started && Number(clientData.age || 35) > 40) {
    observations.push("Retirement corpus allocation appears delayed relative to the investment horizon, requiring accelerated accumulation strategies.");
  }

  return {
    metrics: {
      totalIncome,
      totalOutflow,
      savingsCapacity,
      savingsRatio,
      emiBurdenRatio,
      totalAssets,
      liquidAssets,
      totalLiabilities,
      netWorth,
    },
    flags: {
      singleEarning,
      hasDependents,
      hasLifeIns,
      hasHealthIns,
      hasEmergencyFund
    },
    wellness: {
      score: wellnessScore,
      rating: wellnessRating
    },
    observations
  };
}
