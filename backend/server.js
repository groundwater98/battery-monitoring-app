const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 함수: 명령 실행 및 에러 핸들링
const executeCommand = (command, res, mode) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing ${mode} Mode: ${error.message}`);
      return res.status(500).json({ message: `${mode} Mode execution failed`, error: error.message });
    }
    console.log(`${mode} Mode executed successfully`);
    res.json({ message: `${mode} Mode activated successfully` });
  });
};

// Work Mode 실행
app.post('/api/work', (req, res) => {
  const command = `
    powershell.exe -Command "
      $processorGuid = (powercfg /Q | Select-String 'PROCTHROTTLEMAX').Line.Split()[3];
      $usbGuid = (powercfg /Q | Select-String 'USBSELECT').Line.Split()[3];
      (Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1, 100);
      powercfg /x monitor-timeout-dc 0;
      powercfg /x standby-timeout-dc 0;
      powercfg /x disk-timeout-dc 0;
      powercfg /setacvalueindex SCHEME_CURRENT $processorGuid 100;
      powercfg /setdcvalueindex SCHEME_CURRENT $usbGuid 0;
      powercfg /h /type full;
      Write-Output 'Work Mode Activated';
    "
  `;
  executeCommand(command, res, 'Work');
});

// Rest Mode 실행
app.post('/api/rest', (req, res) => {
  const command = `
    powershell.exe -Command "
      $processorGuid = (powercfg /Q | Select-String 'PROCTHROTTLEMAX').Line.Split()[3];
      $usbGuid = (powercfg /Q | Select-String 'USBSELECT').Line.Split()[3];
      (Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1, 80);
      powercfg /x monitor-timeout-dc 30;
      powercfg /x disk-timeout-dc 30;
      powercfg /x standby-timeout-dc 30;
      powercfg /setdcvalueindex SCHEME_CURRENT $processorGuid 70;
      powercfg /setdcvalueindex SCHEME_CURRENT $usbGuid 1;
      powercfg /h /type reduced;
      Write-Output 'Rest Mode Activated';
    "
  `;
  executeCommand(command, res, 'Rest');
});

// Sleep Mode 실행
app.post('/api/sleep', (req, res) => {
  const command = `
    powershell.exe -Command "
      $processorGuid = (powercfg /Q | Select-String 'PROCTHROTTLEMAX').Line.Split()[3];
      $usbGuid = (powercfg /Q | Select-String 'USBSELECT').Line.Split()[3];
      (Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1, 50);
      powercfg /x monitor-timeout-dc 10;
      powercfg /x disk-timeout-dc 10;
      powercfg /x standby-timeout-dc 10;
      powercfg /setdcvalueindex SCHEME_CURRENT $processorGuid 50;
      powercfg /setdcvalueindex SCHEME_CURRENT $usbGuid 1;
      powercfg /h /type reduced;
      Write-Output 'Sleep Mode Activated';
    "
  `;
  executeCommand(command, res, 'Sleep');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
