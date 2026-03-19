#!/usr/bin/env python3
"""
Job Application Automation System
- Sends applications
- Tracks sent emails
- Logs to file
"""

import yagmail
import json
import os
from datetime import datetime

# Configuration
SENDER_EMAIL = "makoridylan@gmail.com"
APP_PASSWORD = "jgrc rccr xmcq dfxm"
TRACKER_FILE = "/home/currentsuspect/.openclaw/workspace/memory/sent_applications.json"

# Dylan's CV path
CV_PATH = "/home/currentsuspect/.openclaw/media/inbound/Dylan_Makori_CV.pdf"

def load_tracker():
    """Load the application tracker."""
    if os.path.exists(TRACKER_FILE):
        with open(TRACKER_FILE, 'r') as f:
            return json.load(f)
    return {"applications": []}

def save_tracker(tracker):
    """Save the application tracker."""
    os.makedirs(os.path.dirname(TRACKER_FILE), exist_ok=True)
    with open(TRACKER_FILE, 'w') as f:
        json.dump(tracker, f, indent=2)

def send_application(company, to_email, subject, body, include_cv=True):
    """Send a job application email."""
    try:
        yag = yagmail.SMTP(SENDER_EMAIL, APP_PASSWORD)
        
        attachment = CV_PATH if include_cv and os.path.exists(CV_PATH) else None
        
        if attachment:
            yag.send(
                to=to_email,
                subject=subject,
                contents=body,
                attachments=attachment
            )
        else:
            yag.send(
                to=to_email,
                subject=subject,
                contents=body
            )
        
        yag.close()
        
        # Log to tracker
        tracker = load_tracker()
        tracker["applications"].append({
            "company": company,
            "email": to_email,
            "subject": subject,
            "sent_at": datetime.now().isoformat(),
            "status": "sent",
            "cv_attached": include_cv
        })
        save_tracker(tracker)
        
        return {"success": True, "message": f"Application sent to {company}"}
    except Exception as e:
        return {"success": False, "error": str(e)}

def get_stats():
    """Get application statistics."""
    tracker = load_tracker()
    apps = tracker["applications"]
    return {
        "total": len(apps),
        "sent": len([a for a in apps if a["status"] == "sent"]),
        "pending": len([a for a in apps if a["status"] == "pending"]),
        "responded": len([a for a in apps if a["status"] == "responded"]),
        "rejected": len([a for a in apps if a["status"] == "rejected"])
    }

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Job Application System")
        print("Commands:")
        print("  stats                    - Show application statistics")
        print("  send <company> <email>   - Send application")
        print("  list                     - List all applications")
        sys.exit(0)
    
    command = sys.argv[1]
    
    if command == "stats":
        stats = get_stats()
        print(json.dumps(stats, indent=2))
    
    elif command == "list":
        tracker = load_tracker()
        for app in tracker["applications"]:
            print(f"[{app['sent_at']}] {app['company']} -> {app['email']} ({app['status']})")
    
    elif command == "send":
        if len(sys.argv) < 4:
            print("Usage: python job_automation.py send <company> <email>")
            sys.exit(1)
        
        company = sys.argv[2]
        to_email = sys.argv[3]
        
        # Read cover letter from stdin
        print(f"Enter cover letter for {company} (Ctrl+D to finish):")
        body = sys.stdin.read()
        
        result = send_application(company, to_email, f"Application for IT Internship Position - {company}", body)
        print(json.dumps(result, indent=2))
