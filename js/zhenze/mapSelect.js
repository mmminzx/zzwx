
function transformMap(initOptions) {
    var This = this;

    this.map = null;
    this.load = function (container, options) {
        This.map = L.map(container, options);
    }
    this.initLayer = function (baseLayers, overlays) {
        if (!This.map) {
            new Error("未初始化地图对象");
        }
        for (var p in baseLayers) {
            baseLayers[p] = This.getTileLayer(baseLayers[p].url, baseLayers[p].options);
        }
        for (var p in overlays) {
            overlays[p] = This.getTileLayer(overlays[p].url, overlays[p].options);
        }
        L.control.layers(baseLayers, overlays).addTo(This.map);
    }
    this.getTileLayer = function (url, options) {
        return L.tileLayer(url, options);
    }

    this.panTo = function (latlng, options) {
        This.map.panTo(latlng, options);
    }
    this.setZoom = function (zoom, options) {
        This.map.setZoom(delta, options);
    }
    this.zoomIn = function (delta, options) {
        This.map.zoomIn(delta, options);
    }
    this.zoomOut = function (delta, options) {
        This.map.zoomOut(delta, options);
    }
    this.fullExent = function (bounds) {
        This.map.fitBounds(bounds);
    }
    this.fitBounds = function (xmin, ymin, xmax, ymax) {
        This.map.fitBounds([[xmin, ymin], [xmax, ymax]]);
    }
    this.remove = function () {
        This.map.remove();
        This.map = null;
    }
    this.clearOverlay = function () {
        //清空地图
        This.map.eachLayer(function (layer) {
            if (!layer._url) This.map.removeLayer(layer);
        }, This.map);
    }
}
L.Projection.Suzhou = {
    project: function (t) {
        var x = 6378245;
        var v = 0.00335232986925914;
        var D = 120.583333;
        var i = -3421129;
        var s = 50805;
        var o = -75.812;
        var n = -10.233;
        var B = Math.PI / 180;
        var E = t.lat * B;
        var y = t.lng * B;
        var z = D * B;
        var p = 2 * v - v * v;
        var m = p / (1 - p);
        var k = Math.tan(E) * Math.tan(E);
        var w = Math.pow(m, 2) * Math.pow(Math.cos(E), 2);
        var G = (y - z) * Math.cos(E);
        var h = (1 - p / 4 - 3 * Math.pow(p, 2) / 64 - 5 * Math.pow(p, 3) / 256) * E;
        var g = (3 * p / 8 + 3 * Math.pow(p, 2) / 32 + 45 * Math.pow(p, 3) / 1024) * Math.sin(2 * E);
        var f = (15 * Math.pow(p, 2) / 256 + 45 * Math.pow(p, 3) / 1024) * Math.sin(4 * E);
        var d = (35 * Math.pow(p, 3) / 3072) * Math.sin(6 * E);
        var r = x * (h - g + f - d);
        var q = x / Math.sqrt(1 - p * Math.pow(Math.sin(E), 2));
        var e = r + q * Math.tan(E) * (Math.pow(G, 2) / 2 + (5 - k + 9 * w + 4 * Math.pow(w, 2)) * Math.pow(G, 4) / 24) + (61 - 58 * k + Math.pow(k, 2) + 270 * w - 330 * k * w) * Math.pow(G, 6) / 720;
        var c = q * (G + (1 - k + w) * Math.pow(G, 3) / 6 + (5 - 18 * k + Math.pow(k, 2) + 14 * w - 58 * k * w) * Math.pow(G, 5) / 120);
        var u = e + i + n;
        var j = c + s + o;
        return new L.Point(j, u)
    },
    unproject: function (C) {
        var B = 6378245;
        var w = 0.00335232986925914;
        var I = 120.583333;
        var c = -3421129;
        var s = 50805;
        var m = -75.812;
        var h = -10.233;
        var v = C.x;
        var u = C.y;
        var q;
        var t;
        var K, J, e, p, E;
        var o, l, g, f;
        var r, H, G, D;
        q = (180 / Math.PI) * 3600;
        v -= s;
        u -= c;
        v -= m;
        u -= h;
        K = u * q / 6367558.4969;
        J = (K * Math.PI / 180) / 3600;
        H = Math.cos(J) * Math.cos(J);
        e = K + (50221746 + (293622 + (2350 + 22 * H) * H) * H) * Math.sin(J) * Math.cos(J) * q * (1e-10);
        p = (e * Math.PI / 180) / 3600;
        G = Math.cos(p) * Math.cos(p);
        r = 6399698.902 - (21562.267 - (108.973 - 0.612 * G) * G) * G;
        o = (0.5 + 0.003369 * G) * Math.sin(p) * Math.cos(p);
        l = 0.333333 - (0.166667 - 0.001123 * G) * G;
        g = 0.25 + (0.16161 + 0.00562 * G) * G;
        f = 0.2 - (0.1667 - 0.0088 * G) * G;
        t = (v / r) / Math.cos(p);
        D = t * t;
        var n = e - (1 - (g - 0.12 * D) * D) * D * o * q;
        n = n / 3600;
        E = (1 - (l - f * D) * D) * t * q;
        var d = (E / 3600) + I;
        return new L.LatLng(n, d)
    }
};

L.CRS.EPSG320500 = L.extend({}, L.CRS, {
    code: "EPSG320500",
    projection: L.Projection.Suzhou,
    originX: -20000,
    originY: 130000,
    minX: -20000,
    minY: -20000,
    maxX: 130000,
    maxY: 130000,
    tileSize: 256,
    latLngToPoint: function (f, d) {
        var c = this.projection.project(f);
        c = this.checkProjectedPoint(c);
        var b = this.getSize(d);
        var a = b.x * ((c.x - this.originX) / (this.maxX - this.minX));
        var e = b.y * ((this.originY - c.y) / (this.maxY - this.minY));
        return new L.Point(a, e)
    },
    pointToLatLng: function (a, e) {
        var f = parseFloat(this.scale(e));
        var d = (a.x * (this.maxX - this.minX)) / f + this.originX;
        var b = this.originY - (a.y * (this.maxY - this.minY)) / f;
        var c = new L.Point(d, b);
        c = this.checkProjectedPoint(c);
        return this.projection.unproject(c)
    },
    scale: function (a) {
        return this.tileSize * Math.pow(2, a)
    },
    getSize: function (b) {
        var a = this.scale(b);
        return L.point(a, a)
    },
    checkProjectedPoint: function (b) {
        var a = b.x;
        var c = b.y;
        while (a < this.minX) {
            a += (this.maxX - this.minX)
        }
        while (a > this.maxX) {
            a -= (this.maxX - this.minX)
        }
        while (c < this.minY) {
            c += (this.maxY - this.minY)
        }
        while (c > this.maxY) {
            c -= (this.maxY - this.minY)
        }
        return L.point(a, c)
    }
});

L.CRS.EPSG320501 = L.extend({}, L.CRS, {
    code: "EPSG320501",
    projection: L.Projection.Suzhou3D,
    originX: -500000,
    originY: 500000,
    minX: -500000,
    minY: -500000,
    maxX: 500000,
    maxY: 500000,
    tileSize: 256,
    latLngToPoint: function (f, d) {
        var c = this.projection.project(f);
        c = this.checkProjectedPoint(c);
        var b = this.getSize(d);
        var a = b.x * ((c.x - this.originX) / (this.maxX - this.minX));
        var e = b.y * ((this.originY - c.y) / (this.maxY - this.minY));
        return new L.Point(a, e)
    },
    pointToLatLng: function (a, e) {
        var f = this.scale(e);
        var d = this.originX + (a.x / f) * (this.maxX - this.minX);
        var b = this.originY - (a.y / f) * (this.maxY - this.minY);
        var c = new L.Point(d, b);
        c = this.checkProjectedPoint(c);
        return this.projection.unproject(c)
    },
    scale: function (a) {
        return this.tileSize * Math.pow(2, a)
    },
    getSize: function (b) {
        var a = this.scale(b);
        return L.point(a, a)
    },
    checkProjectedPoint: function (b) {
        var a = b.x;
        var c = b.y;
        while (a < this.minX) {
            a += (this.maxX - this.minX)
        }
        while (a > this.maxX) {
            a -= (this.maxX - this.minX)
        }
        while (c < this.minY) {
            c += (this.maxY - this.minY)
        }
        while (c > this.maxY) {
            c -= (this.maxY - this.minY)
        }
        return L.point(a, c)
    }
});

function markClick(nn) {
    console.log(nn);
}

$(function () {
    console.log(riverJson.features)
    var states = [];
    for (var i=0;i<riverJson.features.length;i++)
    {
        var dic=riverJson.features[i];
        var temp={"type": "Feature",
            "properties":{"name":dic.attributes.hdname},
            "geometry":{
                "type": "Polygon",
                "coordinates":dic.geometry.rings
            }
        };
        states.push(temp);

    }
    var tiles = L.tileLayer('http://arcgis1.szgis.cn/arcgis/rest/services/SZ_SATELLITE_20150902/MapServer/tile/{z}/{y}/{x}?', {
            maxZoom: 16,
            attribution: '苏州影像  审图号：苏S（2017）003号'
        }),
        latlng = L.latLng(30.9146289553,120.5052875279);
    var latlng = L.latLng(30.9146289553,120.5052875279);
    var mbUrl = 'http://arcgis1.szgis.cn/arcgis/rest/services/SZ_SATELLITE_20150902/MapServer/tile/{z}/{y}/{x}?';
    mbAttr = 'http://arcgis1.szgis.cn/arcgis/rest/services/SZ_MAP_20150902/MapServer/tile/{z}/{y}/{x}?';
    szRoad = 'http://arcgis1.szgis.cn/arcgis/rest/services/SZ_ROAD_20151209/MapServer/tile/{z}/{y}/{x}';
    szPoint = 'http://arcgis1.szgis.cn/arcgis/rest/services/SZ_POI_20151209/MapServer/tile/{z}/{y}/{x}';

    var cities = L.tileLayer(szRoad, { id: 'mapbox.light', maxZoom: 12, attribution: szRoad, center: latlng, crs: L.CRS.EPSG320500 });
    points = L.tileLayer(szPoint, { id: 'mapbox.light', maxZoom: 12, attribution: szPoint, center: latlng, crs: L.CRS.EPSG320500 });
    var Imagery = L.tileLayer(mbAttr, { id: 'mapbox.light', maxZoom: 12, attribution: mbAttr, center: latlng, crs: L.CRS.EPSG320500 }),
        streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', maxZoom: 12, attribution: mbUrl, center: latlng, crs: L.CRS.EPSG320500 });

    var map = L.map('map', {
        center: [30.9146289553,120.5052875279],
        zoom: 4,
        layers: [Imagery],
        crs: L.CRS.EPSG320500,
        zoomControl: false
    });
    L.geoJson(states).addTo(map);
    var data = [
        {"loc":[30.9113189553,120.5072775279], "type":"changgui"},
        {"loc":[30.9146289553,120.5012675279], "type":"yichang"},
        {"loc":[30.9166389553,120.5082775279], "type":"changgui"},
        {"loc":[30.9126589553,120.5032275279], "type":"yichang"},
        {"loc":[30.9176789553,120.50562275279], "type":"changgui"},
    ];



    // for( i in data) {
    //     var type = data[i].type,	//value searched
    //         loc = data[i].loc		//position found
    //     if (type=="changgui")
    //     {
    //         var Icon = L.icon({iconUrl: '../images/changgui(1).png'});
    //
    //         L.marker(new L.latLng(loc),{icon: Icon}).addTo(map).bindPopup('<label>'+"2017-9-12 9:30 常规巡查"+'</label>');
    //
    //
    //     }
    //     else
    //     {
    //
    //         var Icon = L.icon({iconUrl: '../images/yicha.png'});
    //
    //         L.marker(new L.latLng(loc),{icon: Icon}).addTo(map).bindPopup('<label>'+"2017-9-12 9:30 异常上报"+'</label>');
    //     }
    //
    //
    //
    //
    //
    // }




});



//查看详情
function cameraDetailOpen1(id) {
    $.ajax({
        url: SVC_MAP + "/getCameraByCameraId",
        type: "get",
        data: {
            cameraId: id,
        },
        success: function (data2) {
            $('#playReal').html('<iframe src="' + '../demo/test.html?indexCode=' + data2.data.indexCode + '" name="main" width="100%" height="450px" frameborder="0" scrolling="auto" style="overflow:visible;"></iframe>');
        }
    });
    $('#population_detail').fadeIn()
    $('#population_detail').animate({
        //right: '250px',
        height: '450px',
        width: '550px',
    }, "fast");

}
function cameraDetailOpen2(id) {
    $.ajax({
        url: SVC_MAP + "/getCameraByCameraId",
        type: "get",
        data: {
            cameraId: id,
        },
        success: function (data2) {
            $('#playReal').html('<iframe src="' + '../demo/test2.html?indexCode=' + data2.data.indexCode + '" name="main" width="100%" height="450px" frameborder="0" scrolling="auto" style="overflow:visible;"></iframe>');
        }
    });
    $('#population_detail').fadeIn()
    $('#population_detail').animate({
        //right: '250px',
        height: '450px',
        width: '550px',
    }, "fast");

}
function changeFrameHeight() {
    var ifm = document.getElementById("map");
    ifm.height = document.documentElement.clientHeight;

}
window.onresize = function () {
    changeFrameHeight();
} 