'use strict';

var tslib = require('tslib');
var i0 = require('@angular/core');
var core = require('@awesome-cordova-plugins/core');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var i0__namespace = /*#__PURE__*/_interopNamespaceDefault(i0);

var PhotoViewer = /** @class */ (function (_super) {
    tslib.__extends(PhotoViewer, _super);
    function PhotoViewer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhotoViewer.prototype.show = function (url, title, options) { return core.cordova(this, "show", { "sync": true }, arguments); };
    PhotoViewer.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: PhotoViewer, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    PhotoViewer.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: PhotoViewer });
    PhotoViewer.pluginName = "PhotoViewer";
    PhotoViewer.plugin = "com-sarriaroman-photoviewer";
    PhotoViewer.pluginRef = "PhotoViewer";
    PhotoViewer.repo = "https://github.com/sarriaroman/photoviewer";
    PhotoViewer.platforms = ["Android", "iOS"];
    PhotoViewer = tslib.__decorate([], PhotoViewer);
    return PhotoViewer;
}(core.AwesomeCordovaNativePlugin));
i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: PhotoViewer, decorators: [{
            type: i0.Injectable
        }], propDecorators: { show: [] } });

exports.PhotoViewer = PhotoViewer;
