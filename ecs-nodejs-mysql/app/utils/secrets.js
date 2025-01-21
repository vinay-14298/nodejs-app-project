const AWS = require('aws-sdk');

const getSecrets = async (secretName) => {
    const client = new AWS.SecretsManager({ region: 'us-east-2' });

    try {
        const data = await client.getSecretValue({ SecretId: secretName }).promise();
        return JSON.parse(data.SecretString);
    } catch (err) {
        console.error('Error fetching secrets:', err);
        throw err;
    }
};

module.exports = { getSecrets };

