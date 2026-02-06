# GrocerEase Backend Services

The backend follows a **clean, modular, SOA-based architecture** with strict separation of concerns.
Each service owns its domain and business rules, and communicates with other services through well-defined APIs.
Each service lives in its **own Git repository**.

# Development

**Important Instructions For Source Control**:

- Create **branch** for every development/fixes tasks
  - For feature development create a branch with prefix `feat/`
  - For bug fixes create a branch with prefix `fix/`
- DO NOT push on **master or staging** branches directly, instead create a PRs.
- DO NOT merge any PRs into **master** before review.
- Before any branch creation from **staging** branch, make sure to pull the latest changes

# Start Development

1. Clone the service repository you are working on (see SERVICE-PORT.md for repo URLs)
   ```bash
   git clone <service-repo-url>
   cd <service-repo>
   ```
2. Start work as a standalone application

3. Add any new API endpoints to API_DOCS.md file with proper documentation.

4. For each service, make sure to check SERVICE-PORT.md for the assigned port number.

# How to create branch and start working

1. Create branch from staging branch
   ```bash
   git switch staging
   git pull origin staging
   git switch -c feat/your-feature-name
   ```
2. After completing your work, push your branch to remote
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin feat/your-feature-name
   ```
3. Create a Pull Request (PR) from your branch to staging branch on GitHub for review and merging.

4. After PR is approved and merged, switch back to staging branch and pull the latest changes
   ```bash
   git switch staging
   git pull origin staging
   ```

---

# Notes

- Please make sure to follow the above instructions carefully to maintain a clean and organized workflow.

- Feel free to reach out if you have any questions or need assistance!

- Good luck Team!

---

Best Regards,
Amr Elharery
