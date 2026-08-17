import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir:'./tests',
  testMatch:'**/*.spec.js',
  timeout:30000,
  use:{baseURL:'http://127.0.0.1:4173'},
  webServer:{command:'python3 -m http.server 4173 --bind 127.0.0.1',port:4173,reuseExistingServer:true},
  projects:[{name:'chromium',use:{browserName:'chromium'}}]
});
