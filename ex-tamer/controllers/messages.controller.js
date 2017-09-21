const express = require('express');

module.exports.getMessage = (req, res, next) => {
    return res.status(200).json({ message: `Super secret message for: ${req.user.username}` });
}