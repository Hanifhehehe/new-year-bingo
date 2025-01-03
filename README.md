In that case, we can simplify the Firebase configuration for hosting your Next.js app. Here's how to set up Firebase Hosting for your Next.js project:

## Setting Up Firebase Hosting for Next.js

1. Install the Firebase CLI globally if you haven't already:

```bash
npm install -g firebase-tools
```

2. Log in to Firebase:

```bash
firebase login
```

3. Initialize Firebase in your project directory:

```bash
firebase init hosting
```

4. When prompted, select the following options:
   - Choose your Firebase project
   - Use an existing project or create a new one
   - Set the public directory to `out` (we'll create this later)
   - Configure as a single-page app: No
   - Set up automatic builds and deploys with GitHub: No (unless you want to)

5. Modify your `next.config.js` file to enable static exports:

```javascript
module.exports = {
  output: 'export',
}
```

6. Update your `package.json` to include a build script:

```json
"scripts": {
  "build": "next build && next export",
  "deploy": "npm run build && firebase deploy --only hosting"
}
```

7. Build your Next.js app:

```bash
npm run build
```

This will create an `out` directory with your static files.

8. Deploy to Firebase Hosting:

```bash
npm run deploy
```

Your Next.js app should now be deployed to Firebase Hosting. You can view it at the provided Firebase Hosting URL.

## Important Notes

- This setup is for static site generation (SSG) only. If you need server-side rendering (SSR) or API routes, you'll need to use a more complex setup with Cloud Functions.
- Make sure to add `out` to your `.gitignore` file.
- If you have dynamic routes, you may need to configure them in your `next.config.js` file for proper static generation.

By following these steps, you should be able to deploy your Next.js app to Firebase Hosting without needing complex Firebase configurations[1][4][5].

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/23532657/94d17767-b727-4b01-8157-3628235ce1ae/paste.txt
[2] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/23532657/94d17767-b727-4b01-8157-3628235ce1ae/paste.txt
[3] https://hackernoon.com/the-step-by-step-guide-to-deploying-your-nextjs-app-to-firebase-hosting
[4] https://tsykin.com/blog/how-to-deploy-nextjs-to-firebase-hosting
[5] https://www.youtube.com/watch?v=-VwulR_wTv0
[6] https://www.youtube.com/watch?v=EJohL6se54k
[7] https://firebase.google.com/docs/hosting/quickstart
[8] https://www.youtube.com/watch?v=zXj1f4Fhqic
[9] https://dev.to/glennviroux/how-to-deploy-nextjs-to-firebase-18bb