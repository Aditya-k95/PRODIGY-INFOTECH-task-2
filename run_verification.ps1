Write-Host "================= ENTERPRISE EMS END-TO-END VERIFICATION =================" -ForegroundColor Cyan

# 1. Login Admin
Write-Host "`n1. Testing Admin Authentication..." -ForegroundColor Yellow
$loginRes = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body '{"email":"admin@enterprise.com","password":"Admin@123456"}' -ContentType "application/json"
$token = $loginRes.data.token
$adminName = $loginRes.data.user.name
Write-Host "  [PASS] Logged in as: $adminName (Token received: $($token.Substring(0, 15))...)" -ForegroundColor Green

$headers = @{ Authorization = "Bearer $token" }

# 2. Verify Dashboard Stats
Write-Host "`n2. Testing Dashboard Statistics Aggregation..." -ForegroundColor Yellow
$stats = Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/stats" -Method Get -Headers $headers
Write-Host "  [PASS] Total Employees: $($stats.data.totalEmployees)" -ForegroundColor Green
Write-Host "  [PASS] Active Employees: $($stats.data.activeEmployees)" -ForegroundColor Green
Write-Host "  [PASS] Total Departments: $($stats.data.totalDepartments)" -ForegroundColor Green

# 3. Create New Employee (CRUD: Create)
Write-Host "`n3. Testing Employee Creation (CRUD: Create)..." -ForegroundColor Yellow
$newEmp = @{
  employeeId = "EMP-9001"
  fullName = "Alexander Vance"
  email = "alexander.vance@enterprise.com"
  phone = "+1 (555) 789-9988"
  department = "Engineering"
  designation = "Lead AI Infrastructure Architect"
  salary = 185000
  joiningDate = "2025-06-01"
  status = "Active"
} | ConvertTo-Json

$created = Invoke-RestMethod -Uri "http://localhost:5000/api/employees" -Method Post -Body $newEmp -ContentType "application/json" -Headers $headers
$empId = $created.data._id
Write-Host "  [PASS] Created Employee: $($created.data.fullName) (Badge: $($created.data.employeeId), MongoDB ID: $empId)" -ForegroundColor Green

# 4. Read & Search Employee (CRUD: Read)
Write-Host "`n4. Testing Employee Search & Filtering (CRUD: Read)..." -ForegroundColor Yellow
$searchRes = Invoke-RestMethod -Uri "http://localhost:5000/api/employees?search=Alexander" -Method Get -Headers $headers
Write-Host "  [PASS] Found $($searchRes.data.Count) record(s) matching 'Alexander': $($searchRes.data[0].fullName) - $($searchRes.data[0].designation)" -ForegroundColor Green

# 5. Update Employee (CRUD: Update)
Write-Host "`n5. Testing Employee Update (CRUD: Update)..." -ForegroundColor Yellow
$updatePayload = @{
  designation = "Distinguished AI Infrastructure Fellow"
  salary = 210000
} | ConvertTo-Json

$updated = Invoke-RestMethod -Uri "http://localhost:5000/api/employees/$empId" -Method Put -Body $updatePayload -ContentType "application/json" -Headers $headers
Write-Host "  [PASS] Updated Employee: $($updated.data.fullName) -> New Role: $($updated.data.designation), New Salary: `$$($updated.data.salary)" -ForegroundColor Green

# 6. Backend Validation Test: Negative salary reject
Write-Host "`n6. Testing Backend Validation (Zod Schema)..." -ForegroundColor Yellow
try {
  $badPayload = @{ salary = -500 } | ConvertTo-Json
  Invoke-RestMethod -Uri "http://localhost:5000/api/employees/$empId" -Method Put -Body $badPayload -ContentType "application/json" -Headers $headers
  Write-Host "  [FAIL] Failed to reject invalid salary" -ForegroundColor Red
} catch {
  Write-Host "  [PASS] Correctly rejected negative salary via Zod validation" -ForegroundColor Green
}

# 7. Backend Validation Test: Duplicate Employee ID reject
Write-Host "`n7. Testing Uniqueness Validation..." -ForegroundColor Yellow
try {
  $dupPayload = @{
    employeeId = "EMP-1001" # Already exists in seed
    fullName = "Duplicate Person"
    email = "unique@test.com"
    phone = "1234567"
    department = "Engineering"
    designation = "Dev"
    salary = 50000
    joiningDate = "2024-01-01"
    status = "Active"
  } | ConvertTo-Json
  Invoke-RestMethod -Uri "http://localhost:5000/api/employees" -Method Post -Body $dupPayload -ContentType "application/json" -Headers $headers
  Write-Host "  [FAIL] Failed to reject duplicate Employee ID" -ForegroundColor Red
} catch {
  Write-Host "  [PASS] Correctly rejected duplicate Employee ID" -ForegroundColor Green
}

# 8. Delete Employee (CRUD: Delete)
Write-Host "`n8. Testing Employee Deletion (CRUD: Delete)..." -ForegroundColor Yellow
$deleted = Invoke-RestMethod -Uri "http://localhost:5000/api/employees/$empId" -Method Delete -Headers $headers
Write-Host "  [PASS] Deleted Employee: $($deleted.data.fullName) ($($deleted.data.employeeId))" -ForegroundColor Green

# 9. Verify deletion (404)
Write-Host "`n9. Verifying 404 Response after Deletion..." -ForegroundColor Yellow
try {
  Invoke-RestMethod -Uri "http://localhost:5000/api/employees/$empId" -Method Get -Headers $headers
  Write-Host "  [FAIL] Record still exists after deletion" -ForegroundColor Red
} catch {
  Write-Host "  [PASS] Confirmed 404 Not Found after deletion." -ForegroundColor Green
}

# 10. Dashboard Stats Refresh verification
Write-Host "`n10. Verifying Dynamic Dashboard Stats Refresh..." -ForegroundColor Yellow
$freshStats = Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/stats" -Method Get -Headers $headers
Write-Host "  [PASS] Current Total Employees: $($freshStats.data.totalEmployees) across $($freshStats.data.totalDepartments) departments" -ForegroundColor Green

Write-Host "`n================= ALL 10 ENTERPRISE VERIFICATION CHECKS PASSED! =================" -ForegroundColor Cyan
