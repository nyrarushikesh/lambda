aws_region    = "us-east-1"
function_name = "jawa-lambda-function"
handler       = "index.handler"
runtime       = "nodejs20.x"
timeout       = 30
memory_size   = 256

environment_variables = {
  ENVIRONMENT = "production"
  LOG_LEVEL   = "info"
}

tags = {
  Project     = "jawa"
  Environment = "production"
  ManagedBy   = "terraform"
}
