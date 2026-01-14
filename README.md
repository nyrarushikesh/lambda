# Jawa Lambda Project

This project deploys an AWS Lambda function using Terraform with TypeScript.

## Project Structure

```
jawa/
├─ infra/                    # Terraform infrastructure
│  ├─ main.tf               # Main Terraform configuration
│  ├─ variables.tf          # Input variables
│  ├─ outputs.tf            # Output values
│  └─ terraform.tfvars      # Variable values
├─ modules/
│  └─ lambda/               # Lambda module
│     ├─ main.tf            # Lambda resources
│     ├─ variables.tf       # Module variables
│     ├─ outputs.tf         # Module outputs
│     ├─ build.ts           # Build script
│     ├─ package.json       # Node.js dependencies
│     ├─ tsconfig.json      # TypeScript config
│     └─ src/
│        └─ handler.ts      # Lambda handler
└─ .github/
   └─ workflows/
      └─ deploy.yml         # CI/CD pipeline
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [Terraform](https://www.terraform.io/) (v1.0 or later)
- [AWS CLI](https://aws.amazon.com/cli/) configured with credentials
- AWS account with appropriate permissions

## Local Development

### 1. Install Dependencies

```bash
cd modules/lambda
npm install
```

### 2. Build Lambda Function

```bash
npm run build
```

### 3. Deploy with Terraform

```bash
cd ../../infra
terraform init
terraform plan
terraform apply
```

## GitHub Actions Deployment

The project includes a GitHub Actions workflow that automatically:

1. Builds the Lambda function
2. Runs Terraform format check
3. Plans infrastructure changes (on PRs)
4. Applies changes to AWS (on main branch)

### Required Secrets

Add these secrets to your GitHub repository:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## Configuration

Edit `infra/terraform.tfvars` to customize:

- AWS region
- Function name
- Runtime settings
- Environment variables
- Tags

## Lambda Handler

The Lambda function is written in TypeScript and handles API Gateway proxy events. Modify `modules/lambda/src/handler.ts` to implement your business logic.

## Outputs

After deployment, Terraform outputs:

- Lambda function ARN
- Lambda function name
- Invoke ARN
- Execution role ARN

## Clean Up

To destroy all resources:

```bash
cd infra
terraform destroy
```

## License

ISC
