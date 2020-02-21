# You Need to Hear This
#### YNTHT: A social music sharing app

## Infrastructure / Deployments

#### Terraform
- This project uses Terraform 0.12 to create a t2.micro EC2 instance in the us-east-1 region
- The Terraform state is checked into source control for now
- To work with Terraform, cd into the /terraform directory and run commands from there
- `terraform destroy` to destroy the machine

#### AWS
- Other than the EC2 instance, some setup was needed manually in AWS to configure an IAM role, security group, a pem file, etc.
- I also set up an AWS alert for if I'm gonna spend more than $5 in a month
- The AWS security group manages what ports are accessible, so accessing a port requires adding it in the outbound rules for the security group attached to the server
- The app is kept running on EC2 via pm2
- The EC2 instance has node installed on it
- For now it's reachable at http://54.197.207.141:5000/

#### The Domain
- I bought yntht.net from Google Domains for $12 https://domains.google.com/m/registrar/yntht.net

#### Deployments
- Locate the default.pem file and cd to its directory to SSH into the server
  ```
  ssh -i "default.pem" ubuntu@54.197.207.141
  ```
- Go to the repo and clean up the old build
  ```
  cd workspace/yntht/
  rm -rf yntht-backend/build/
  ```
- Pull the newest code from origin master
  ```
  git pull
  ```
- Install dependencies, build frontend, and move it to the backend directory
  ```
  cd yntht-frontend
  npm install
  npm run build
  mv build ../yntht-backend/
  ```
- Install backend dependencies
  ```
  cd ../yntht-backend
  npm install
  ```
- Reload the app with 0 downtime with pm2
  ```
  pm2 reload yntht
  ```

#### Tips
- Set up the app with pm2
  ```
  pm2 start index.js --name yntht
  ```

## Upcoming

#### Infrastructure To-Do's:
- Map the yntht.net domain to the `54.197.207.141` IP address
- Get a production database up and running
- Dockerize the app and use ECR as outlined here: https://www.reddit.com/r/devops/comments/81fgmi/terraform_docker_ecr_ecs/
- Automate deployments with CircleCI

#### Future Code Improvements:
- Clean up all references to colors, constants, hard coded values, etc.
- Abstract CSS stuff into variables for consistency
- Go through and make sure everwhere asyncronous has some sort of loading component (i.e. login button)
- Figure out a better css system; there are bugs if two classes have the same name, we need some namespacing for these classes somehow
- Favicon

#### Future Features:
- Thumbs up and thumbs down songs
- Specifically recommend a song to someone
- Forgot password flow
