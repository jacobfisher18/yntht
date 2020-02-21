provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

resource "aws_instance" "example" {
  ami             = "ami-13be557e"
  instance_type   = "t2.micro"
  key_name        = "default" # the default key pair already created in aws console
}
