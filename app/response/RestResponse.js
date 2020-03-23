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
        message: msg
    });
};

exports.notFound = function(res) {
    return res.status(404).json({
        success: false,
        message: "Page not found"
    });
};

exports.invalidData = function(res, msg, data) {

    if(data.details) {
        return res.status(400).json({
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

exports.unauthorized = function(res) {
    return res.status(401).json({
        success: false,
        message: 'Unauthorized'
    });
};