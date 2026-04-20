# CloseFlow

CloseFlow is a lightweight web app prototype for sales reps who want a daily execution view instead of a heavy CRM dashboard.

## Open the app

Open [index.html](C:/Users/balll/OneDrive/Documentos/Horizons/index.html) in your browser.

## What it does

- Ranks deals into a Daily Hit List using a rule-based scoring system
- Supports CSV uploads for simple pipeline management
- Gates features by subscription tier
- Tracks action completion for calls, emails, and deal advancement
- Shows team analytics on Pro and Enterprise
- Unlocks custom scoring controls on Enterprise

## CSV columns

Use a header row with these columns:

`name, company, stage, value, daysSinceLastContact, intent, closeDate, owner, email, phone`

Example:

```csv
name,company,stage,value,daysSinceLastContact,intent,closeDate,owner,email,phone
Maya Patel,Northstar Labs,Proposal Sent,18000,5,High,2026-04-24,Alex,maya@northstarlabs.co,+44 20 1000 2001
Jordan Lee,Aperture Freight,Demo Booked,9500,2,High,2026-04-22,Alex,jordan@aperturefreight.com,+44 20 1000 2002
```
