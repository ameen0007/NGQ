const fs = require('fs');

function refactorAdminPage() {
  let code = fs.readFileSync('app/admin/page.tsx', 'utf8');

  // Add import
  if (!code.includes('import ClientForm')) {
    code = code.replace('import { createClientAccount, getAllProfiles } from "@/app/actions/admin";', 
      'import { createClientAccount, getAllProfiles } from "@/app/actions/admin";\nimport ClientForm from "@/components/ClientForm";');
  }

  // Remove states
  code = code.replace(/\/\/\s*── BASIC STATE ──[\s\S]*?const \[advancedGoals.*?\]\(\[\]\);/g, '// Form state is managed by ClientForm');

  // Replace resetForm & handleCreateClient
  code = code.replace(/function resetForm\(\) \{[\s\S]*?async function handleCreateClient[\s\S]*?setFormPending\(false\);\n  \}/g, 
  `async function handleCreateClient(formData: FormData) {
    setFormPending(true);
    setFormMessage({ text: "", type: "" });

    const result = await createClientAccount(formData);
    if (result.error) {
      setFormMessage({ text: result.error, type: "error" });
    } else {
      setFormMessage({ text: result.message || "Client registered successfully!", type: "success" });
      setTimeout(() => { setIsCreateClientOpen(false); }, 2000);
    }
    setFormPending(false);
  }`);

  // Update button click
  code = code.replace(/resetForm\(\);\s*setIsCreateClientOpen\(true\);/g, 'setIsCreateClientOpen(true);');

  // Replace form with ClientForm
  code = code.replace(/<form onSubmit=\{handleCreateClient\}[\s\S]*?<\/form>/g, 
    `<ClientForm key={isCreateClientOpen ? 'open' : 'closed'} onSubmit={handleCreateClient} isPending={formPending} submitLabel="Register Client Account" />`);

  fs.writeFileSync('app/admin/page.tsx', code);
  console.log("Refactored app/admin/page.tsx");
}

function refactorClientsPage() {
  let code = fs.readFileSync('app/admin/clients/page.tsx', 'utf8');

  // Add import
  if (!code.includes('import ClientForm')) {
    code = code.replace('import { getAllProfiles, deleteClientAccount, updateClientAccount } from "@/app/actions/admin";', 
      'import { getAllProfiles, deleteClientAccount, updateClientAccount } from "@/app/actions/admin";\nimport ClientForm from "@/components/ClientForm";');
  }

  // Remove states
  code = code.replace(/\/\/\s*── BASIC STATE ──[\s\S]*?const \[advancedGoals.*?\]\(\[\]\);/g, '// Form state is managed by ClientForm');

  // Fix handleUpdate to accept formData
  code = code.replace(/const handleUpdate = async \(e: React.FormEvent<HTMLFormElement>\) => \{[\s\S]*?const result = await updateClientAccount\(editingClient.id, formData\);/g, 
  `const handleUpdate = async (formData: FormData) => {
    setFormPending(true);
    setFormMessage({ text: "", type: "" });

    const result = await updateClientAccount(editingClient.id, formData);`);

  // Remove setEditingClient state initializations inside openEditModal
  code = code.replace(/const openEditModal = \(client: any\) => \{[\s\S]*?setAdvancedGoals\(\[\]\);\n    \}\n  \};/g, 
  `const openEditModal = (client: any) => {
    setFormMessage({ text: "", type: "" });
    setEditingClient(client);
    setShowAdvanced(false);
  };`);

  // Replace the edit form with ClientForm
  code = code.replace(/<form onSubmit=\{handleUpdate\}[\s\S]*?<\/form>/g, 
    `<ClientForm key={editingClient.id} initialData={editingClient} onSubmit={handleUpdate} isPending={formPending} submitLabel="Save Changes" />`);

  // Also remove addAdvancedGoal, removeAdvancedGoal, updateAdvancedGoal from clients page since ClientForm has it
  code = code.replace(/function addAdvancedGoal\(\) \{.*?\}\n  function removeAdvancedGoal\(id: number\) \{.*?\}\n  function updateAdvancedGoal\(id: number, field: string, value: string\) \{.*?\}/g, "");
  
  // Also remove totalIncome etc.
  code = code.replace(/\/\/ Auto-calcs\n  const totalIncome = incSelf \+ incSpouse \+ incOther;\n  const totalOutflow = expMonthly \+ expEmi;\n  const savingsCapacity = totalIncome - totalOutflow;\n  const totalAssets = astBank \+ astFd \+ astMf \+ astStocks \+ astGold \+ astRe \+ astOther;\n  const totalLiabilities = liaHome \+ liaPersonal \+ liaVehicle \+ liaCc \+ liaOther;/g, "");

  fs.writeFileSync('app/admin/clients/page.tsx', code);
  console.log("Refactored app/admin/clients/page.tsx");
}

refactorAdminPage();
refactorClientsPage();
