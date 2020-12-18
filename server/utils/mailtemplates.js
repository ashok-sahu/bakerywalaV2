exports.resetEmail = (host, resetToken) => {
  const message = {
    subject: "Reset Password",
    text:
      `${
        "You are receiving this because you have requested to reset your password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        "http://"
      }${host}/reset-password/${resetToken}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  return message;
};

exports.confirmResetPasswordEmail = () => {
  const message = {
    subject: "Password Changed",
    text:
      `You are receiving this email because you changed your password. \n\n` +
      `If you did not request this change, please contact us immediately.`,
  };

  return message;
};

exports.forgotPassword = (token) => {
  const message = {
    subject: "Password Reset link",
    text:
      `You are receiving this email because you changed your password. \n\n` +
      `If you did not request this change, please contact us immediately.`,
    html: `
    <h1>Please use the following link to reset your password</h1>
    <p>${process.env.CLIENT_URI}/users/password/reset/${token}</p>
    <hr />
    <p>This email may contain sensetive information</p>
    <p>${process.env.CLIENT_URI}</p>
      `,
  };
  return message
};

exports.signupEmail = (token) => {
  const message = {
    subject: "Account Activation Link",
    text: `Hi ${token}! Thank you for creating an account with us!.`,
    html: `<h1 > Please Click The Link To Active </h1>
      <hr/>
      <p>${process.env.CLIENT_URI}/users/activate/${token} </p>
      <p>This Email contains Sensetive Info</p>
      <p>${process.env.CLIENT_URI}</p>`,
  };
  return message;
};

exports.loginSuccess = (data) => {
  const message = {
    subject: "Welcome To Bakerywala",
    text: `Hi ${data}! Thank you for your Interest In our Shop`,
    html: `<b style={color:'red'}>${data}</b>`,
  };
  return message;
};

exports.newsletterSubscriptionEmail = () => {
  const message = {
    subject: "Newsletter Subscription",
    text:
      `You are receiving this email because you subscribed to our newsletter. \n\n` +
      `If you did not request this change, please contact us immediately.`,
  };

  return message;
};

exports.contactEmail = () => {
  const message = {
    subject: "Contact Us",
    text: `We received your message! Our team will contact you soon. \n\n`,
  };

  return message;
};

exports.merchantApplicationEmail = () => {
  const message = {
    subject: "Sell on MERN Store",
    text: `We received your request! Our team will contact you soon. \n\n`,
  };

  return message;
};

exports.orderConfirmationEmail = (order) => {
  const message = {
    subject: `Order Confirmation ${order._id}`,
    text:
      `Hi ${order.user.profile.firstName}! Thank you for your order!. \n\n` +
      `We've received your order and will contact you as soon as your package is shipped. \n\n`,
  };

  return message;
};
