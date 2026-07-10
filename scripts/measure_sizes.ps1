$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $PSScriptRoot
$paths = @('node_modules', '.firebase', 'dist', 'public', 'src', '.git')
foreach ($p in $paths) {
    if (Test-Path $p) {
        $s = (Get-ChildItem $p -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
        $mb = [math]::Round(($s / 1MB), 2)
        Write-Output ("{0,-20} {1,8} MB" -f $p, $mb)
    } else {
        Write-Output ("{0,-20} not found" -f $p)
    }
}
# Total repo size
$total = (Get-ChildItem -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
Write-Output ('{0,-20} {1,8} MB' -f 'TOTAL', [math]::Round(($total/1MB),2))
