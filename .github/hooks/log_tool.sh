#!/bin/bash
mkdir -p .github/hooks/logs
echo "[$(date)] TOOL: $TOOL_NAME" >> .github/hooks/logs/tool_executions.log