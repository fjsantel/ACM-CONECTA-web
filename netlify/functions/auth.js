const axios = require('axios');

exports.handler = async (event) => {
  const { httpMethod, queryStringParameters } = event;

  // Handle authorization request (redirect to GitHub)
  if (httpMethod === 'GET' && !queryStringParameters.code) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = `${process.env.URL || 'https://acmconecta.netlify.app'}/.netlify/functions/auth/callback`;

    return {
      statusCode: 302,
      headers: {
        Location: `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`
      }
    };
  }

  // Handle callback from GitHub (exchange code for token)
  if (queryStringParameters.code) {
    const { code } = queryStringParameters;

    try {
      // Exchange code for access token
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code
        },
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );

      const { access_token, error } = response.data;

      if (error) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: error })
        };
      }

      // Return HTML that posts the token back to the opener window
      const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Authenticating...</title>
  <script>
    (function() {
      const receiveMessage = function(message) {
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify({
            token: "${access_token}",
            provider: "github"
          }),
          message.origin
        );
      };

      window.addEventListener("message", receiveMessage, false);

      window.opener.postMessage("authorizing:github", "*");

      setTimeout(function() {
        receiveMessage({ origin: window.opener.location.origin });
        window.close();
      }, 100);
    })();
  </script>
</head>
<body>
  <p>Authenticating... You can close this window.</p>
</body>
</html>
`;

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html'
        },
        body: html
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Failed to get access token',
          details: error.message
        })
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Invalid request' })
  };
};
