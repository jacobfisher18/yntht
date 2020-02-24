# You Need to Hear This
#### YNTHT: A social music sharing app

## Infrastructure / Deployments

#### Terraform
- This project uses Terraform 0.12 to create a t2.micro EC2 instance in the us-east-1 region
- The Terraform state is checked into source control for now
- To work with Terraform, cd into the /terraform directory and run commands from there
- `terraform destroy` destroys the machine, but note that the IP is hard coded in a lot of places and will be lost, as well as Node, pm2, and Nginx installations

#### AWS
- Other than the EC2 instance, some setup was needed manually in AWS to configure an IAM role, security group, a pem file, etc.
- The AWS security group manages what ports are accessible, so accessing a port requires adding it in the outbound rules for the security group attached to the server
- The app is kept running on EC2 via pm2, and is run via node, which is installed on the instance

# Database
- The database is configured in AWS RDS. There are a dev and a prod version.

#### Nginx
- The server uses Nginx as a reverse proxy. Configuration was done manually while ssh'ed into the machine.

#### The Domain
- I bought yntht.net from Google Domains for $12 https://domains.google.com/m/registrar/yntht.net

#### Deployments
- The deploy.sh script will ssh into the server, build, and deploy the latest master branch.

# Environment Variables
- The backend relies on a .env file that is gitignored, and it will throw an exception without it. SSH into the server to work with the file in production.

#### Set up EC2 Instance
- Load aws credentials locally, using a key and secret from an IAM user with admin access
  ```
  aws configure
  ```
- Terraform apply to make the EC2 instance; note the key_name attached to it
- Navigate to the pem file and ssh into the instance
  ```
  ssh -i "default.pem" ubuntu@[SERVER_IP]
  ```
- Install node 10
  ```
  curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- Install pm2
  ```
  sudo npm install -g pm2
  ```
- Make a working directory
  ```
  mkdir workspace/
  cd workspace/
  ```
- Clone the repo
  ```
  git clone https://github.com/jacobfisher18/yntht.git
  ```
- Build the app as outlined in the Deployments section
- Start up the app with pm2
  ```
  pm2 start index.js --name yntht
  ```
- Configure Nginx and setup TLS with certbot

## Upcoming

#### Improvements:
- Dockerize the app and use ECR, automate/containerize the Node, pm2, and Nginx setup
- CI/CD
- Logging and monitoring
- Make it responsive, mobile friendly, and looking good on all browsers
- Block/redirect routes like /login if the user is already logged in
- Make sure everwhere asyncronous has some sort of loading component (i.e. login button)
- Write tests

#### Code Quality / Cleanup:
- Prop types
- Clean up all references to colors, constants, hard coded values, etc.
- Abstract CSS stuff into variables for consistency
- Figure out a better css system; there are bugs if two classes have the same name, we need some namespacing for these classes somehow

#### Features:
- Ability to delete a user's own account
- Search for users, view their page, follow them
- Thumbs up and thumbs down songs
- Specifically recommend a song to someone
- Forgot password flow
