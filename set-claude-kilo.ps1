# Set environment variables for Claude Code with Kilo.ai
$env:ANTHROPIC_BASE_URL = "https://api.kilo.ai/api/openrouter/"
$env:ANTHROPIC_AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJwcm9kdWN0aW9uIiwia2lsb1VzZXJJZCI6IjFkZDY3MzU1LTE3NTgtNGE5MC05ZTc4LWY4MjljNTBmZjk2MyIsImFwaVRva2VuUGVwcGVyIjpudWxsLCJ2ZXJzaW9uIjozLCJpYXQiOjE3NzM2NDI1NDEsImV4cCI6MTkzMTMyMjU0MX0.LWoQvoXSu-QhpQH91-vPXZaPVkXcSd6hnjw4FzNhkC4"
$env:ANTHROPIC_API_KEY = ""
$env:ANTHROPIC_MODEL = "kilo-auto/free"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL = "kilo-auto/free"

Write-Host "----------------------------------------------------" -ForegroundColor Cyan
Write-Host "Claude Code environment configured for Kilo.ai" -ForegroundColor Green
Write-Host "Model: kilo-auto/free"
Write-Host "Base URL: https://api.kilo.ai/api/openrouter/"
Write-Host "----------------------------------------------------"
Write-Host "You can now run 'claude' in this session."
Write-Host "To make this permanent, add these lines to your `$PROFILE"
