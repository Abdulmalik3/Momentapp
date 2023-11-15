var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AwesomeCordovaNativePlugin, cordova } from '@awesome-cordova-plugins/core';
var PhotoViewerOriginal = /** @class */ (function (_super) {
    __extends(PhotoViewerOriginal, _super);
    function PhotoViewerOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhotoViewerOriginal.prototype.show = function (url, title, options) { return cordova(this, "show", { "sync": true }, arguments); };
    PhotoViewerOriginal.pluginName = "PhotoViewer";
    PhotoViewerOriginal.plugin = "com-sarriaroman-photoviewer";
    PhotoViewerOriginal.pluginRef = "PhotoViewer";
    PhotoViewerOriginal.repo = "https://github.com/sarriaroman/photoviewer";
    PhotoViewerOriginal.platforms = ["Android", "iOS"];
    return PhotoViewerOriginal;
}(AwesomeCordovaNativePlugin));
var PhotoViewer = new PhotoViewerOriginal();
export { PhotoViewer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL3BsdWdpbnMvcGhvdG8tdmlld2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sdUNBQStDLE1BQU0sK0JBQStCLENBQUM7O0lBd0QzRCwrQkFBMEI7Ozs7SUFTekQsMEJBQUksYUFBQyxHQUFXLEVBQUUsS0FBYyxFQUFFLE9BQTRCOzs7Ozs7c0JBbEVoRTtFQXlEaUMsMEJBQTBCO1NBQTlDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBBd2Vzb21lQ29yZG92YU5hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBob3RvVmlld2VyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBTZXQgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGUgc2hhcmUgYnV0dG9uIChBbmRyb2lkIG9ubHkpLiBEZWZhdWx0OiB0cnVlXG4gICAqL1xuICBzaGFyZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBZGQgSFRUUCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0LiAgVXNlZnVsIGZvciBhdXRoZW50aWNhdGVkIHBhZ2VzLlxuICAgKiBUaGUgdmFsdWUgaXMgYSBzdHJpbmcgaW4gYSBKU09OIGZvcm1hdC4gIERlZmF1bHQ6ICcnXG4gICAqL1xuICBoZWFkZXJzPzogc3RyaW5nO1xuICAvKipcbiAgICogT3B0aW9uIGZvciBjbG9zZSBidXR0b24gdmlzaWJpbGl0eSB3aGVuIHNoYXJlIGZhbHNlIFtPTkxZIEZPUiBpT1NdXG4gICAqL1xuICBjbG9zZUJ1dHRvbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJZiB5b3UgbmVlZCB0byBjb3B5IGltYWdlIHRvIHJlZmVyZW5jZSBiZWZvcmUgc2hvdyB0aGVuIHNldCBpdCB0cnVlIFtPTkxZIEZPUiBpT1NdXG4gICAqL1xuICBjb3B5VG9SZWZlcmVuY2U/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlIG9yIERpc2FibGUgUGljYXNzbyBPcHRpb25zICggT25seSBBbmRyb2lkICk6IGZpdCwgY2VudGVySW5zaWRlLCBjZW50ZXJDcm9wLlxuICAgKi9cbiAgcGljY2Fzb09wdGlvbnM/OiB7XG4gICAgZml0PzogYm9vbGVhbjtcbiAgICBjZW50ZXJJbnNpZGU/OiBib29sZWFuO1xuICAgIGNlbnRlckNyb3A/OiBib29sZWFuO1xuICB9O1xufVxuXG4vKipcbiAqIEBuYW1lIFBob3RvIFZpZXdlclxuICogQGRlc2NyaXB0aW9uIFRoaXMgcGx1Z2luIGNhbiBkaXNwbGF5IHlvdXIgaW1hZ2UgaW4gZnVsbCBzY3JlZW4gd2l0aCB0aGUgYWJpbGl0eSB0byBwYW4sIHpvb20sIGFuZCBzaGFyZSB0aGUgaW1hZ2UuXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IFBob3RvVmlld2VyIH0gZnJvbSAnQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL3Bob3RvLXZpZXdlci9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgcGhvdG9WaWV3ZXI6IFBob3RvVmlld2VyKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKiB0aGlzLnBob3RvVmlld2VyLnNob3coJ2h0dHBzOi8vbXlzaXRlLmNvbS9wYXRoL3RvL2ltYWdlLmpwZycpO1xuICpcbiAqIHRoaXMucGhvdG9WaWV3ZXIuc2hvdygnaHR0cHM6Ly9teXNpdGUuY29tL3BhdGgvdG8vaW1hZ2UuanBnJywgJ015IGltYWdlIHRpdGxlJywge3NoYXJlOiBmYWxzZX0pO1xuICpcbiAqIHRoaXMucGhvdG9WaWV3ZXIuc2hvdygnaHR0cHM6Ly9teXNlY3VyZXNpdGUuY29tL3BhdGgvdG8vaW1hZ2UuanBnJywgJ015IGltYWdlIHRpdGxlJywge3NoYXJlOiBmYWxzZSwgaGVhZGVyczogJ3t1c2VybmFtZTpmb28scGFzc3dvcmQ6YmFyfSd9KTtcbiAqIGBgYFxuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ1Bob3RvVmlld2VyJyxcbiAgcGx1Z2luOiAnY29tLXNhcnJpYXJvbWFuLXBob3Rvdmlld2VyJyxcbiAgcGx1Z2luUmVmOiAnUGhvdG9WaWV3ZXInLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL3NhcnJpYXJvbWFuL3Bob3Rvdmlld2VyJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnLCAnaU9TJ10sXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBob3RvVmlld2VyIGV4dGVuZHMgQXdlc29tZUNvcmRvdmFOYXRpdmVQbHVnaW4ge1xuICAvKipcbiAgICogU2hvd3MgYW4gaW1hZ2UgaW4gZnVsbCBzY3JlZW5cbiAgICpcbiAgICogQHBhcmFtIHVybCB7c3RyaW5nfSBVUkwgb3IgcGF0aCB0byBpbWFnZVxuICAgKiBAcGFyYW0gdGl0bGUge3N0cmluZ31cbiAgICogQHBhcmFtIG9wdGlvbnMge1Bob3RvVmlld2VyT3B0aW9uc31cbiAgICovXG4gIEBDb3Jkb3ZhKHsgc3luYzogdHJ1ZSB9KVxuICBzaG93KHVybDogc3RyaW5nLCB0aXRsZT86IHN0cmluZywgb3B0aW9ucz86IFBob3RvVmlld2VyT3B0aW9ucyk6IHZvaWQge31cbn1cbiJdfQ==