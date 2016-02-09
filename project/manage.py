#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    if "MODE" in os.environ and os.environ["MODE"] == "production":
      os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
    else:
      os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.test_settings")
    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
