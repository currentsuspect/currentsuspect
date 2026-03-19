#!/usr/bin/env python3
"""
Job Application Email Sender
Sends job applications via Gmail SMTP
"""

import yagmail
import sys
import json
from datetime import datetime

# Configuration
SENDER_EMAIL = "makoridylan@gmail.com"
APP_PASSWORD = "jgrc rccr xmcq dfxm"

def send_application(to_email, subject, body, attachment_path=None):
    """Send a job application email."""
    try:
        yag = yagmail.SMTP(SENDER_EMAIL, APP_PASSWORD)
        
        # Send email
        if attachment_path:
            yag.send(
                to=to_email,
                subject=subject,
                contents=body,
                attachments=attachment_path
            )
        else:
            yag.send(
                to=to_email,
                subject=subject,
                contents=body
            )
        
        yag.close()
        return {"success": True, "timestamp": datetime.now().isoformat()}
    except Exception as e:
        return {"success": False, "error": str(e)}

def test_connection():
    """Test Gmail SMTP connection."""
    try:
        yag = yagmail.SMTP(SENDER_EMAIL, APP_PASSWORD)
        yag.close()
        return {"success": True, "message": "Gmail SMTP connection successful!"}
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python email_sender.py test|send")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "test":
        result = test_connection()
        print(json.dumps(result, indent=2))
    elif command == "send":
        if len(sys.argv) < 5:
            print("Usage: python email_sender.py send <to> <subject> <body_file> [attachment]")
            sys.exit(1)
        
        to_email = sys.argv[2]
        subject = sys.argv[3]
        body_file = sys.argv[4]
        attachment = sys.argv[5] if len(sys.argv) > 5 else None
        
        with open(body_file, 'r') as f:
            body = f.read()
        
        result = send_application(to_email, subject, body, attachment)
        print(json.dumps(result, indent=2))
