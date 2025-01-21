const AWS = require('aws-sdk');

const secretsManager = new AWS.SecretsManager();

const getSecrets = async (secretName) => {
    try {
        console.log(`Retrieving secret: ${secretName} from AWS Secrets Manager...`);
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

        if (data.SecretString) {
            console.log('Secret retrieved successfully');
            return JSON.parse(data.SecretString);  // Assuming the secret is a JSON string
        } else {
            const buff = Buffer.from(data.SecretBinary, 'base64');
            console.log('Secret retrieved successfully');
            return JSON.parse(buff.toString('ascii'));
        }
    } catch (err) {
        console.error(`Error retrieving secret ${secretName}:`, err);
        throw err;
    }
};

// Example usage
// Use the correct secret name here
const initDb = async () => {
    const secrets = await getSecrets('mysql-db-credentials'); // Use the actual secret name here
    console.log('Retrieved secrets:', secrets);
};

initDb();


