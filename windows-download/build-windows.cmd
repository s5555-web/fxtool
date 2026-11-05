@echo off
setlocal
cd /d "%~dp0"
for %%F in (fxtool-windows-x64.part1 fxtool-windows-x64.part2 fxtool-windows-x64.part3) do (
  if not exist "%%F" (
    echo Missing file: %%F. Extract the complete ZIP first.
    pause
    exit /b 1
  )
)
copy /b /y "fxtool-windows-x64.part1"+"fxtool-windows-x64.part2"+"fxtool-windows-x64.part3" "fxtool-windows-x64.exe"
if errorlevel 1 (
  echo Could not create EXE. Extract into a writable folder and retry.
  pause
  exit /b 1
)
powershell.exe -NoProfile -Command "if ((Get-FileHash -LiteralPath './fxtool-windows-x64.exe' -Algorithm SHA256).Hash -ne '40B06A6998947CDEC0490372A542661AFFD008122D2625430EEA75681B2C3FDF') { Write-Error 'Checksum failed. Download the complete ZIP again.'; exit 1 }"
if errorlevel 1 (
  echo Verification failed. Do not run the generated EXE.
  pause
  exit /b 1
)
echo Verified successfully. Double-click fxtool-windows-x64.exe to run.
pause
