# read migration name
echo "Enter migration name: "
read migration_name

# create migration
dotnet-ef migrations add $migration_name

dotnet-ef database update