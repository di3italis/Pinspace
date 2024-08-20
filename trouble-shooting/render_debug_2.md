Render Debugging II - Database Issues
Render Debugging II - Database Issues
Use the tips and tools below to further troubleshoot your deployment. This article focuses on debugging details entered in the Render platform, as well as more advanced debugging of your database.


Database Issues
Since creating a database is a simple process with the Render GUI, most issues related to the database are not caused by the database creation phase. Instead, they may be caused by errors in configuring your application to run in the production environment (i.e., errors in the project repo) or errors in connecting your application to the Render Postgres database instance (i.e., errors setting up the Web Service in the Render GUI).

Check the following to make sure your project is properly set up to run sqlite in development and Postgres in production, and that your database connection is set up properly:

Environment variables: Did you include the FLASK_ENV variable set to "production" and the DATABASE_URL key set to the "Internal Database URL" value from your Render Postgres database instance? Does your REACT_APP_BASE_URL value match the url assigned to your project by render?

Deployment logs: Did each command in your build script and start script run as expected?

If the build fails while installing requirements, carefully check each line in the requirements.txt file to make sure that there are no typos or syntax errors and that each dependency is using a current version.
Deployment logs: Did the migration files and seeder files run as expected?

Checking the Postgres Database (Advanced Troubleshooting)
If you've checked all of the issues described above, you can further troubleshoot your deployment by examining the contents of your Postgres database. In order to do this, you must have PostgreSQLLinks to an external site. command line tools installed locally on your computer. If you do not have PostgreSQL installed already, follow the directions below to install the tools that will allow you to interact with your database.

Mac Installation
Navigate to the Postgres DownloadsLinks to an external site. page and click on the icon for the Mac download (latest version). Follow the instructions on the installer. You can choose the default options on each screen except the "Select Components" screen. On that page, select only the "Command Line Tools" option.

psql-mac

When installation is complete, follow the instructions below to interact with your Render database using the PSQL Command Line Tools.

See the Mac Installation DocumentationLinks to an external site. for more details or troubleshooting.

Windows Installation through WSL
You will install the PostgresQL client tools through WSL. This will allow you to interact with a remotely-hosted PostgresQL server, without the ability to host your own PostgresQL database server.

Open your Ubuntu terminal and enter the following command:

sudo apt install postgresql-client

You will need your Ubuntu user password since you are using sudo.

When installation is complete, follow the instructions below to interact with your Render.com database using the Postgres client through your Ubuntu terminal.

Interacting with your Database (All)
To access your Render Postgres database, copy the PSQL Command value from the information page of your database in Render. The value should start with "PGPASSWORD=" and should include information about your database.

Paste this value into your terminal. This will open up Postgres with a connection to your remote database. At this point, you can use Postgres commands locally to examine the contents of your database. Try the following:

\dn - lists all of the schemas in the database

Does your database show the correct schema for your project?
\dt <schema_name>.* - lists all tables within <schema_name> schema

Do you see all of your tables within the schema? You should see the users table, as well as the alembic_version tables at this point.
SELECT * FROM <schema_name>.users; - lists all entries in the users table within <schema_name> schema

Does the users table show the appropriate seed data?

If there are any problems with the way the database or schema is set up, you can drop the schema for your application and all tables within it, using the following command:

DROP SCHEMA <schema_name> CASCADE;
Use Control-d to close your database connection and exit out of the PSQL Command Line Tools.

Never commit the PSQL Command string to git. Make sure that any files that may contain this string are in the .gitignore file, and check that the file is properly being ignored by git.
