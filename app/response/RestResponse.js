exports.success = function(res, msg) {
    return res.status(200).json({
        success: true,
        message: msg
    });
};

exports.successData = function(res, msg, data) {
    return res.status(200).json({
        success: true,
        message: msg,
        data: data
    });
};

exports.error = function(res, msg) {
    return res.status(500).json({
        success: false,
        message: msg.message || msg
    });
};

exports.notFound = function(res, msg = "Resource not found") {
    return res.status(404).json({
        success: false,
        message: msg
    });
};

exports.invalidData = function(res, msg, data) {

    if(data.details) {
        return res.status(422).json({
            success: false,
            message: msg,
            data: data.details
        });
    }

    return res.status(400).json({
        success: false,
        message: msg,
        data: data
    });
};

exports.unauthorized = function(res, msg) {
    return res.status(401).json({
        success: false,
        message: msg.message || msg
    });
};

exports.forbidden = function(res, msg) {
    return res.status(403).json({
        success: false,
        message: msg
    });
};

exports.send = function(res, status, success, msg, data) {
    return res.status(status).json({
        success: success,
        message: msg,
        data: data
    });
};

exports.bad = function(res, msg) {
    return res.status(400).json({
        success: false,
        message: msg
    });
};

exports.conflict = function(res, msg) {
    return res.status(409).json({
        success: false,
        message: msg
    });
};