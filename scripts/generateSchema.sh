SERVICE_URL=$1

echo "Generating GraphQL types"

if [ -z "$SERVICE_URL" ]; then
  SERVICE_URL="http://localhost:4000/graphql"
fi
echo "Using service URL $SERVICE_URL"

cp codegen.template.yml codegen.yml
sed 's@SCHEMA_URL@'"$SERVICE_URL"'@' codegen.template.yml > codegen.yml
yarn graphql-codegen

