# DataCurve - Python Code Execution Site

App link: https://datacurve-takehome-hitanshu.vercel.app/

Backend API link: https://datacurvetakehome-production.up.railway.app/docs#

## Usage

To access the site, go to the link pasted above.
Write your code on the left pane, and click Run Code to see your output on the right pane.
Click Submit to add your code and its output to the database.

To manually invoke endpoints, go to the backend API link pasted above. Specifically, if you would like to view all of the submissions in the database, use GET /submissions endpoint.

I have created an execution environment inside of AWS Lambda. When a user runs their code, the backend invokes an AWS Lambda function that executes the code. This prevents any malicious behavious from the user, as the AWS environment is safe, isolated, and had limited resources. Additionally, this implentation allows future scalability.

## Technologies

- **Frontend**: React, Next.js, Tailwind, TypeScript, Monaco Code Editor
- **Backend**: FastAPI, Docker, AWS Lambda Functions
- **Database**: MySQL (hosted on Railway)
  - The database has an extra table for Users. I added this because I would like to extend this project by adding users in the future!

## File Structure

### Backend
- `main.py`: Includes all of the endpoints
- `models.py`: Defines Pydantic models
- `schema.py`: Sets up the database schema
- `database.py`: Connects to the database
- `lambda/`: Stores files that were used to deploy the AWS Lambda function
  - `dockerfile`
  - `lambda_function.py`: This is the function in AWS Lambda
  - `requirements.txt`: Installs `scipy` and `pandas` in AWS environment

### Frontend
- `app/`
  - `api/`: Defines functions that interact with backend endpoints
  - `components/`: React components
  - `styles/`: CSS file
  - `page.tsx`: Main UI file
- Other files are for configuration

