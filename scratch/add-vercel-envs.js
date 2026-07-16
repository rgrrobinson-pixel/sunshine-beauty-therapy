const { execSync } = require('child_process');

const envs = [
  // PAYPAL_ENV
  ['PAYPAL_ENV', 'production', 'live'],
  ['PAYPAL_ENV', 'preview', 'live'],
  ['PAYPAL_ENV', 'development', 'live'],
  
  // NEXT_PUBLIC_PAYPAL_CLIENT_ID
  ['NEXT_PUBLIC_PAYPAL_CLIENT_ID', 'production', 'AYVRxBtIiNa6GS5Gl4piEY6BWa6Iesqg-AXJQ3bdXSqHlQc_o8GPyg6YtuyqxCc7tki3Mq5pjmJGM3d-'],
  ['NEXT_PUBLIC_PAYPAL_CLIENT_ID', 'preview', 'AYVRxBtIiNa6GS5Gl4piEY6BWa6Iesqg-AXJQ3bdXSqHlQc_o8GPyg6YtuyqxCc7tki3Mq5pjmJGM3d-'],
  ['NEXT_PUBLIC_PAYPAL_CLIENT_ID', 'development', 'AYVRxBtIiNa6GS5Gl4piEY6BWa6Iesqg-AXJQ3bdXSqHlQc_o8GPyg6YtuyqxCc7tki3Mq5pjmJGM3d-'],
  
  // PAYPAL_CLIENT_ID
  ['PAYPAL_CLIENT_ID', 'production', 'AYVRxBtIiNa6GS5Gl4piEY6BWa6Iesqg-AXJQ3bdXSqHlQc_o8GPyg6YtuyqxCc7tki3Mq5pjmJGM3d-'],
  ['PAYPAL_CLIENT_ID', 'preview', 'AYVRxBtIiNa6GS5Gl4piEY6BWa6Iesqg-AXJQ3bdXSqHlQc_o8GPyg6YtuyqxCc7tki3Mq5pjmJGM3d-'],
  ['PAYPAL_CLIENT_ID', 'development', 'AYVRxBtIiNa6GS5Gl4piEY6BWa6Iesqg-AXJQ3bdXSqHlQc_o8GPyg6YtuyqxCc7tki3Mq5pjmJGM3d-'],
  
  // PAYPAL_CLIENT_SECRET
  ['PAYPAL_CLIENT_SECRET', 'production', 'EDR_NZQ8XPsjo-z0uLP2cJ4kKoZCWiwTRPXzg_mW_MLYggWngLmJwrl2WHsaLEW2ffAjfyP_MyUrKj7v'],
  ['PAYPAL_CLIENT_SECRET', 'preview', 'EDR_NZQ8XPsjo-z0uLP2cJ4kKoZCWiwTRPXzg_mW_MLYggWngLmJwrl2WHsaLEW2ffAjfyP_MyUrKj7v'],
  ['PAYPAL_CLIENT_SECRET', 'development', 'EDR_NZQ8XPsjo-z0uLP2cJ4kKoZCWiwTRPXzg_mW_MLYggWngLmJwrl2WHsaLEW2ffAjfyP_MyUrKj7v']
];

for (const [name, target, value] of envs) {
  console.log(`Adding ${name} to ${target}...`);
  try {
    const cmd = `npx vercel env add ${name} ${target} --value "${value}" --yes --force`;
    const output = execSync(cmd, { stdio: 'pipe' }).toString();
    console.log(output);
  } catch (err) {
    console.error(`FAILED adding ${name} to ${target}:`, err.message);
    if (err.stdout) console.error("Stdout:", err.stdout.toString());
    if (err.stderr) console.error("Stderr:", err.stderr.toString());
  }
}
