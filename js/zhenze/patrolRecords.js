var bool=true;
function pushHistory() {
    var state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, state.title, state.url);
}

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

        pushHistory();
        bool=true;
        window.addEventListener("popstate", function(e) {
            if(bool)
            {
                location.href='signList.html';  //在这里指定其返回的地址
            }
            pushHistory();

        }, false);

        var value = localStorage["totalsSign"];
        var Data= JSON.parse(value)
        console.log(Data);
        var tiles = L.tileLayer('http://arcgis1.szgis.cn/arcgis/rest/services/SZ_SATELLITE_20150902/MapServer/tile/{z}/{y}/{x}?', {
                maxZoom: 12,
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
            center: Data[0]['loc'],
            zoom: 7,
            layers: [Imagery],
            crs: L.CRS.EPSG320500,
            zoomControl: false
        });




        // var polyline = new L.polyline(Data
        // , {
        //     color: 'blue',
        //     opacity: 0.5,
        //     weight: 3
        // }).addTo(map);
        //
        // var polyline = new L.polyline([
        //     [30.9126589553,120.5032275279],
        //     [30.9113189553,120.5072775279],
        //     [30.9166389553,120.5082775279],
        //     [30.9176789553,120.50562275279],
        //     [30.9146289553,120.5012675279]
        // ], {
        //     color: 'blue',
        //     opacity: 0.5,
        //     weight: 3
        // }).addTo(map);
        // var data = [
        //     {"loc":[30.9113189553,120.5072775279], "type":"changgui"},
        //     {"loc":[30.9146289553,120.5012675279], "type":"yichang"},
        //     {"loc":[30.9166389553,120.5082775279], "type":"changgui"},
        //     {"loc":[30.9126589553,120.5032275279], "type":"yichang"},
        //     {"loc":[30.9176789553,120.50562275279], "type":"changgui"},
        // ];
        //
        // for( i in data) {
        //     var type = data[i].type,	//value searched
        //         loc = data[i].loc		//position found
        //     if (type=="changgui")
        //     {
        //         var Icon = L.icon({iconUrl: '../images/changgui(1).png'});
        //
        //         L.marker(new L.latLng(loc)).addTo(map).bindPopup('<label>'+"2017-9-28 9:30 异常上报"+'</label>');
        //
        //
        //     }
        //     else
        //     {
        //
        //         var Icon = L.icon({iconUrl: '../images/yicha.png'});
        //
        //         L.marker(new L.latLng(loc)).addTo(map).bindPopup('<label>'+"2017-9-28 9:30 签到"+'</label>');
        //     }
        //
        //
        //
        //
        //
        // }
        // var polyline = new L.polyline(Data
        //     , {
        //         color: 'blue',
        //         opacity: 0.5,
        //         weight: 3
        //     }).addTo(map);

        // var data=[];

        // for( dd in Data)
        // {
        //     data.push({"loc":Data[dd], "type":"changgui"})
        //     // 30.9124371686,120.5094498200
        //     // data.push({"loc":[30.921904068301,120.52681793755], "type":"changgui"})
        // }
        // console.log(data)
        // var data = [
        //     {"loc":[30.9113189553,120.5072775279], "type":"changgui"},
        //     {"loc":[30.9146289553,120.5012675279], "type":"yichang"},
        //     {"loc":[30.9166389553,120.5082775279], "type":"changgui"},
        //     {"loc":[30.9126589553,120.5032275279], "type":"yichang"},
        //     {"loc":[30.9176789553,120.50562275279], "type":"changgui"},
        // ];

        for( i in Data) {
            console.log(Data[i]);
            var type = Data[i].type,	//value searched
                loc = Data[i].loc		//position found
            if (type=="异常上报")
            {

                var greenIcon = L.icon({
                    iconUrl: '../images/shangbao.png',
                    iconSize:     [30, 40], // size of the icon
                });
                L.marker(loc, {icon: greenIcon}).addTo(map).bindPopup('<label>'+"异常上报"+'</label>');
                // var Icon = L.icon({iconUrl: '../images/shangbao(1).png'});


                // L.marker(new L.latLng(loc)).addTo(map).bindPopup('<label>'+"上报点位"+'</label>');


            }
            else if (type=="亮点推送")
            {

                // var Icon = L.icon({iconUrl: '../images/zil.png'});
                //
                // L.marker(new L.latLng(loc)).addTo(map).bindPopup('<label>'+"资料积累"+'</label>');
                var greenIcon = L.icon({
                    iconUrl: '../images/fjll.png',
                    iconSize:     [30, 40], // size of the icon
                });
                L.marker(loc, {icon: greenIcon}).addTo(map).bindPopup('<label>'+"亮点推送"+'</label>');
            }

            else if (type=="工作照片")
            {

                // var Icon = L.icon({iconUrl: '../images/zp.png'});

                // L.marker(new L.latLng(loc)).addTo(map).bindPopup('<label>'+"工作照片"+'</label>');

                var greenIcon = L.icon({
                    iconUrl: '../images/zp.png',
                    iconSize:     [30, 40], // size of the icon
                });
                L.marker(loc, {icon: greenIcon}).addTo(map).bindPopup('<label>'+"工作照片"+'</label>');
            }
            else if (type=="资料上报")
            {

                // var Icon = L.icon({iconUrl: '../images/zil.png'});
                //
                // L.marker(new L.latLng(loc)).addTo(map).bindPopup('<label>'+"资料积累"+'</label>');
                var greenIcon = L.icon({
                    iconUrl: '../images/zil.png',
                    iconSize:     [30, 40], // size of the icon
                });
                L.marker(loc, {icon: greenIcon}).addTo(map).bindPopup('<label>'+"资料积累"+'</label>');
            }





        }


        // var  token=$.cookie('zzwxToken');
        // // 接口 http://112.81.63.243/ZZWaterDB/sharedService/Ashx_Question.
        // $.ajax({
        //     type: "get",
        //     url: svcHeader + "Ashx_Question.ashx",
        //     dataType: 'jsonp',
        //     jsonp: 'callback',
        //     data: {
        //         method: "getSignHistory",
        //         token:token,
        //         page:1,
        //         pageSize:10
        //     },
        //     success: function (result) {
        //         console.log(result);
        //         if (result.isOK) {
        //             var cors=result.rows[0].coordinate;
        //             var sorss="["+cors+"]";
        //             // console.log(sorss);
        //             var Data= JSON.parse(sorss)
        //             console.log(Data);
        //
        //
        //         }
        //         else
        //         {
        //             console.log("nono")
        //             $("#myPopup1").html(" <a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn ui-icon-delete ui-btn-icon-notext ui-btn-right\">关闭</a><h2 style=\"text-align:center;\">获取数据失败！</h2><p>" + result.message + "</p>")
        //             $("#myPopup1").popup('open');
        //
        //         }
        //     },
        //     error: function (XMLHttpRequest, textStatus, errorThrown) {
        //         alert("获取数据失败！");
        //     }
        // });







        // var baseLayers = {
        //     "矢量地图": Imagery,
        //     "影像地图": streets
        // };
        // var overlays = {
        //     "叠加路网": cities,
        //     "叠加兴趣点": points
        // };
        // L.control.layers(baseLayers, overlays).addTo(map);
        // var markers = L.markerClusterGroup();
        // shi = L.icon({
        //     iconUrl: '../assets/img/2_map/13.png',
        //     iconRetinaUrl: '../assets/img/2_map/13.png',
        //     iconSize: [29, 32],
        // });
        // zhen = L.icon({
        //     iconUrl: '../assets/img/2_map/12.png',
        //     iconRetinaUrl: '../assets/img/2_map/12.png',
        //     iconSize: [29, 32],
        // });
        // cun = L.icon({
        //     iconUrl: '../assets/img/2_map/14.png',
        //     iconRetinaUrl: '../assets/img/2_map/14.png',
        //     iconSize: [29, 32],
        // });
        // addDistrict();








        // /*------------搜索框---------------*/
        // $('#map_search_btn').click(function () {
        //     $('.list-group').html('');
        //     $.ajax({
        //         url: SVC_MAP + "/SearchforCamera",
        //         type: "GET",
        //         data: {
        //             offset: 0,
        //             userID: $.cookie("JTZH_userID"),
        //             search: $('#map_search').val()
        //         },
        //         success: function (data) {
        //
        //             for (var i in data.data) {
        //                 var name = '';
        //                 if (data.data[i] != null) name = data.data[i];
        //                 $('.list-group').append(
        //                     '<a href="#" class="list-group-item" name="' + data.data[i] + '">' +
        //                     '<p class="list-group-item-text"><span class="glyphicon glyphicon-map-marker" style="color:#2f94c1"></span>' + name + '</p>' +
        //
        //                     '</a>')
        //             }
        //             //if(data.total)
        //             /*------------搜索内容-------------*/
        //             $('.list-group-item').click(function () {
        //                 $.ajax({
        //                     url: SVC_MAP + "/SearchDetailByCameraName",
        //                     type: "get",
        //                     data: {
        //                         cameraName: this.name
        //                     },
        //                     success: function (data) {
        //
        //                         if (data.success == true) {
        //                             var name = data.data.name;
        //                             var type = data.data.type;
        //                             var IP = data.data.IP;
        //                             var location = data.data.location;
        //                             var direction = data.data.direction;
        //                             var remark = data.data.remark;
        //                             if (location == null) { location = '--' }
        //                             if (direction == null) { direction = '--' }
        //                             if (remark == null) { remark = '--' }
        //                             if (IP == null) { IP = '--' }
        //                             //  cleanLayer(map);
        //                             L.marker([data.data.x, data.data.y], {
        //                                 riseOnHover: true
        //                             }).addTo(map)
        //                                 .bindPopup('<table class="table table-condensed table-bordered">' +
        //                                     '<thead>' +
        //                                     '<tr>' +
        //                                     '<th style="color:blue">类型</th>' +
        //                                     ' <td>' + type + '</td>' +
        //                                     '<th style="color:blue">操作一</th>' +
        //                                     '<td>' + '<a onclick="cameraDetailOpen1(\'' + data.data.cameraId + '\')">实时监控</a>' + '</td>' +
        //                                     '</tr>' +
        //                                     '<tr>' +
        //                                     '<th style="color:blue">IP</th>' +
        //                                     ' <td>' + IP + '</td>' +
        //                                     '<th style="color:blue">操作二</th>' +
        //                                     '<td>' + '<a onclick="cameraDetailOpen2(\'' + data.data.cameraId + '\')">监控回放</a>' + '</td>' +
        //                                     '</tr>' +
        //                                     '<tr>' +
        //                                     '<th style="color:blue">名称</th>' +
        //                                     ' <td>' + name + '</td>' +
        //                                     '<th style="color:blue">位置</th>' +
        //                                     '<td>' + location + '</td>' +
        //                                     '</tr>' +
        //                                     '<tr>' +
        //                                     '<th style="color:blue">备注</th>' +
        //                                     ' <td>' + remark + '</td>' +
        //                                     '<th style="color:blue">简介</th>' +
        //                                     '<td>' + direction + '</td>' +
        //                                     '</tr>' +
        //                                     '</thead>' +
        //                                     '</table>'
        //                                     , {
        //                                         minWidth: 400
        //                                     });
        //                             map.setView([data.data.x, data.data.y]);
        //                         } else {
        //                             alert(data.message);
        //                         }
        //                     },
        //                     error: function () {
        //                         console.warn("网络错误！");
        //                     }
        //                 })
        //             })
        //         }
        //     })
        //     $('#search_list').show();
        // })
        // $('#map_search').keyup(function () {
        //     if ($('#map_search').val() == '') $('#search_list').hide();
        // })
        //
        // var img = $("#progressImgage");
        // var mask = $("#maskOfProgressImage");
        // $.ajax({
        //     url: SVC_SYS + "/getCameraTypeList",
        //     type: "get",
        //     success: function (data1) {
        //         var camera = '';
        //         for (var i in data1.rows) {
        //             if (data1.rows[i].type != null) {
        //                 camera += '<li class="map_cameraType"><a href="javascript:;"><span style="background: white;width:40px; height: 30px;border-radius: 15px; font-size:12px;color:' + data1.rows[i].color + '; "><i class="glyphicon glyphicon-map-marker"style="  "></i></span>&nbsp;&nbsp;&nbsp;<span class="map_cameraType_point" style="color:white;font-size:12px;">' + data1.rows[i].type + '</span></a></li>'
        //                 //  camera += '<li   class="map_cameraType" ><a href="javascript:;"  ><span style="background: url(\'' + '../assets/img/2_map/circle.png' + '\'");background-size: 30px 30px;width: 30px; height: 30px;-moz-border-radius:15px; -webkit-border-radius: 15px; border-radius: 15px;font-size:14px;color:' + data1.rows[i].color + '"><i class="glyphicon glyphicon-map-marker"></i></span>&nbsp;&nbsp;&nbsp;<span class="map_cameraType_point"style="color:white;font-size:12px;">' + data1.rows[i].type + '</span></a></li>'
        //             }
        //         }
        //         $('#cameraType').html(camera);
        //         //监控类型叠加
        //         $(".map_cameraType").click(function () {
        //             $.ajax({
        //                 url: SVC_MAP + "/getCameraByType",
        //                 type: "get",
        //                 data: {
        //                     userID: $.cookie("JTZH_userID"),
        //                     type: $(this).find(".map_cameraType_point").text(),
        //                 },
        //                 beforeSend: function () {
        //                     img.show().css({
        //                         "position": "fixed",
        //                         "top": "40%",
        //                         "left": "45%",
        //                         "margin-top": function () { return -1 * img.height() / 2; },
        //                         "margin-left": function () { return -1 * img.width() / 2; }
        //                     });
        //                     mask.show().css("opacity", "0.5");
        //
        //                 },
        //                 complete: function () {
        //
        //                 },
        //                 success: function (data) {
        //                     var markers = L.markerClusterGroup();
        //                     var marker = [];
        //                     for (var j = 0; j < data.data.length; j++) {
        //                         var popup = L.popup();
        //                         var a = data.data[j];
        //                         var color = data.data[j].color;
        //                         var isOnline = data.data[j].isOnline;
        //                         if (isOnline == '0') {
        //                             color = "#808080"
        //                         }
        //
        //                         $.ajax({
        //                             url: SVC_MAP + "/getCameraByCameraId",
        //                             type: "get",
        //                             data: {
        //                                 cameraId: data.data[j].cameraId,
        //                             },
        //                             success: function (data2) {
        //                                 var name = data2.data.name;
        //                                 var type = data2.data.type;
        //                                 var IP = data2.data.IP;
        //                                 var location = data2.data.location;
        //                                 var direction = data2.data.direction;
        //                                 var remark = data2.data.remark;
        //                                 if (location == null) { location = '--' }
        //                                 if (direction == null) { direction = '--' }
        //                                 if (remark == null) { remark = '--' }
        //                                 if (IP == null) { IP = '--' }
        //                                 L.marker(new L.LatLng(data2.data.x, data2.data.y), {
        //                                     icon: L.divIcon({
        //                                         html: '<div style="font-size:32px;color:' + color + '"><i class="glyphicon glyphicon-map-marker"></i></div> '// <div class="position" style="' + 'border: .4em solid' + color + ';" > </div>
        //                                     })
        //                                 }).addTo(markers).bindPopup('<table class="table table-condensed table-bordered">' +
        //                                     '<thead>' +
        //                                     '<tr>' +
        //                                     '<th style="color:blue">类型</th>' +
        //                                     ' <td>' + type + '</td>' +
        //                                     '<th style="color:blue">操作一</th>' +
        //                                     '<td>' + '<a onclick="cameraDetailOpen1(\'' + data2.data.cameraId + '\')">实时监控</a>' + '</td>' +
        //                                     '</tr>' +
        //                                     '<tr>' +
        //                                     '<th style="color:blue">IP</th>' +
        //                                     ' <td>' + IP + '</td>' +
        //                                     '<th style="color:blue">操作二</th>' +
        //                                     '<td>' + '<a onclick="cameraDetailOpen2(\'' + data2.data.cameraId + '\')">监控回放</a>' + '</td>' +
        //                                     '</tr>' +
        //                                     '<tr>' +
        //                                     '<th style="color:blue">名称</th>' +
        //                                     ' <td>' + name + '</td>' +
        //                                     '<th style="color:blue">位置</th>' +
        //                                     '<td>' + location + '</td>' +
        //                                     '</tr>' +
        //                                     '<tr>' +
        //                                     '<th style="color:blue">备注</th>' +
        //                                     ' <td>' + remark + '</td>' +
        //                                     '<th style="color:blue">简介</th>' +
        //                                     '<td>' + direction + '</td>' +
        //                                     '</tr>' +
        //                                     '</thead>' +
        //                                     '</table>')
        //                             }
        //                         });
        //
        //                     }
        //                     map.addLayer(markers);
        //                     setTimeout(img.hide(), 5000)
        //                     setTimeout(mask.hide(), 5000)
        //                     jbzcIcon = L.icon({
        //                         iconUrl: '../resource/map/img_a.png',
        //                         iconRetinaUrl: '../resource/map/img_a.png',
        //                         iconSize: [29, 32],
        //                     });
        //                     //清除标注
        //                     $("#Clear_Marker").click(function () {
        //                         map.removeLayer(markers);
        //                     })
        //                 }
        //             })
        //
        //
        //         })
        //     }
        // })
        //
        // $("#huanwei").click(function () {
        //     $("#prog").css("width", "100%").text("正在加载");
        //     $.ajax({
        //         url: SVC_MAP + "/getCameraByType",
        //         type: "get",
        //         data: {
        //             userID: $.cookie("JTZH_userID"),
        //             type: '环卫所'
        //         },
        //         success: function (data) {
        //
        //             var markers = L.markerClusterGroup();
        //             jkIcon = L.icon({
        //                 iconUrl: '../assets/js/common/leaflet/images/camera_qiuji.png',
        //                 iconRetinaUrl: '../assets/js/common/leaflet/images/camera_qiuji.png',
        //                 iconSize: [29, 32],
        //             });
        //             var markers = L.markerClusterGroup();
        //             var marker = [];
        //             for (var j = 0; j < data.data.length; j++) {
        //                 var popup = L.popup();
        //                 var a = data.data[j];
        //                 var color = data.data[j].color;
        //                 var isOnline = data.data[j].isOnline;
        //                 if (isOnline == '1') {
        //                     color = "#808080"
        //                 }
        //
        //                 $.ajax({
        //                     url: SVC_MAP + "/getCameraByCameraId?",
        //                     type: "get",
        //                     data: {
        //                         cameraId: data.data[j].cameraId,
        //                     },
        //                     success: function (data2) {
        //
        //                         var name = data2.data.name;
        //                         var type = data2.data.type;
        //                         var IP = data2.data.IP;
        //                         var location = data2.data.location;
        //                         var direction = data2.data.direction;
        //                         var remark = data2.data.remark;
        //                         if (location == null) { location = '--' }
        //                         if (direction == null) { direction = '--' }
        //                         if (remark == null) { remark = '--' }
        //                         if (IP == null) { IP = '--' }
        //                         L.marker(new L.LatLng(data2.data.x, data2.data.y), {
        //                             icon: L.divIcon({
        //                                 html: ' <div class="position" style="' + 'border: .4em solid' + color + ';" > </div>'
        //                             })
        //                         }).addTo(markers).bindPopup('<table class="table table-condensed table-bordered">' +
        //                             '<thead>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">类型</th>' +
        //                             ' <td>' + type + '</td>' +
        //                             '<th style="color:blue">操作一</th>' +
        //                             '<td>' + '<a onclick="cameraDetailOpen1(\'' + data2.data.cameraId + '\')">实时监控</a>' + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">IP</th>' +
        //                             ' <td>' + IP + '</td>' +
        //                             '<th style="color:blue">操作二</th>' +
        //                             '<td>' + '<a onclick="cameraDetailOpen2(\'' + data2.data.cameraId + '\')">监控回放</a>' + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">名称</th>' +
        //                             ' <td>' + name + '</td>' +
        //                             '<th style="color:blue">位置</th>' +
        //                             '<td>' + location + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">备注</th>' +
        //                             ' <td>' + remark + '</td>' +
        //                             '<th style="color:blue">简介</th>' +
        //                             '<td>' + direction + '</td>' +
        //                             '</tr>' +
        //                             '</thead>' +
        //                             '</table>')
        //                     }
        //                 });
        //
        //             }
        //             map.addLayer(markers);
        //             jbzcIcon = L.icon({
        //                 iconUrl: '../resource/map/img_a.png',
        //                 iconRetinaUrl: '../resource/map/img_a.png',
        //                 iconSize: [29, 32],
        //             });
        //             //清除标注
        //             $("#Clear_Marker").click(function () {
        //                 map.removeLayer(markers);
        //             })
        //         }
        //     })
        //
        //
        // })
        // $("#gongan").click(function () {
        //     $("#prog").css("width", "100%").text("正在加载");
        //     $.ajax({
        //         url: SVC_MAP + "/getCameraByType",
        //         type: "get",
        //         data: {
        //             userID: $.cookie("JTZH_userID"),
        //             type: '公安治安'
        //         },
        //         success: function (data) {
        //             var markers = L.markerClusterGroup();
        //             var markers = L.markerClusterGroup();
        //             var marker = [];
        //             for (var j = 0; j < data.data.length; j++) {
        //                 var a = data.data[j];
        //                 var color = data.data[j].color;//isOnline
        //                 var isOnline = data.data[j].isOnline;
        //                 if (isOnline == '1') {
        //                     color = "#808080"
        //                 }
        //
        //                 $.ajax({
        //                     url: SVC_MAP + "/getCameraByCameraId?",
        //                     type: "get",
        //                     data: {
        //                         cameraId: data.data[j].cameraId,
        //                     },
        //                     success: function (data2) {
        //
        //
        //                         var name = data2.data.name;
        //                         var type = data2.data.type;
        //                         var IP = data2.data.IP;
        //                         var location = data2.data.location;
        //                         var direction = data2.data.direction;
        //                         var remark = data2.data.remark;
        //                         if (location == null) { location = '--' }
        //                         if (direction == null) { direction = '--' }
        //                         if (remark == null) { remark = '--' }
        //                         if (IP == null) { IP = '--' }
        //                         L.marker(new L.LatLng(data2.data.x, data2.data.y), {
        //                             icon: L.divIcon({
        //                                 html: '<div style="font-size:32px;color:' + color + '"><i class="glyphicon glyphicon-map-marker"></i></div> '// <div class="position" style="' + 'border: .4em solid' + color + ';" > </div>
        //                             })
        //                         }).addTo(markers).bindPopup('<table class="table table-condensed table-bordered">' +
        //                             '<thead>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">类型</th>' +
        //                             ' <td>' + type + '</td>' +
        //                             '<th style="color:blue">操作一</th>' +
        //                             '<td>' + '<a onclick="cameraDetailOpen1(\'' + data2.data.cameraId + '\')">实时监控</a>' + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">IP</th>' +
        //                             ' <td>' + IP + '</td>' +
        //                             '<th style="color:blue">操作二</th>' +
        //                             '<td>' + '<a onclick="cameraDetailOpen2(\'' + data2.data.cameraId + '\')">监控回放</a>' + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">名称</th>' +
        //                             ' <td>' + name + '</td>' +
        //                             '<th style="color:blue">位置</th>' +
        //                             '<td>' + location + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">备注</th>' +
        //                             ' <td>' + remark + '</td>' +
        //                             '<th style="color:blue">简介</th>' +
        //                             '<td>' + direction + '</td>' +
        //                             '</tr>' +
        //                             '</thead>' +
        //                             '</table>')
        //                     },
        //                 });
        //             }
        //             map.addLayer(markers);
        //             setTimeout("$('#prog').css('width', '0%').text('')", 800)
        //             jbzcIcon = L.icon({
        //                 iconUrl: '../resource/map/img_a.png',
        //                 iconRetinaUrl: '../resource/map/img_a.png',
        //                 iconSize: [29, 32],
        //             });
        //             //清除标注
        //             $("#Clear_Marker").click(function () {
        //                 map.removeLayer(markers);
        //             })
        //         }
        //     })
        //
        //
        // })
        // $("#cunji").click(function () {
        //     $("#prog").css("width", "100%").text("正在加载");
        //     $.ajax({
        //         url: SVC_MAP + "/getCameraByType",
        //         type: "get",
        //         data: {
        //             userID: $.cookie("JTZH_userID"),
        //             type: '村村通'
        //         },
        //         success: function (data) {
        //
        //             var markers = L.markerClusterGroup();
        //             jkIcon = L.icon({
        //                 iconUrl: '../assets/js/common/leaflet/images/camera_qiuji.png',
        //                 iconRetinaUrl: '../assets/js/common/leaflet/images/camera_qiuji.png',
        //                 iconSize: [29, 32],
        //             });
        //             var markers = L.markerClusterGroup();
        //             var marker = [];
        //             for (var j = 0; j < data.data.length; j++) {
        //                 var popup = L.popup();
        //                 var a = data.data[j];
        //                 var color = data.data[j].color;
        //                 var isOnline = data.data[j].isOnline;
        //                 if (isOnline == '1') {
        //                     color = "#808080"
        //                 }
        //
        //                 $.ajax({
        //                     url: SVC_MAP + "/getCameraByCameraId?",
        //                     type: "get",
        //                     data: {
        //                         cameraId: data.data[j].cameraId,
        //                     },
        //                     success: function (data2) {
        //
        //                         var name = data2.data.name;
        //                         var type = data2.data.type;
        //                         var IP = data2.data.IP;
        //                         var location = data2.data.location;
        //                         var direction = data2.data.direction;
        //                         var remark = data2.data.remark;
        //                         if (location == null) { location = '--' }
        //                         if (direction == null) { direction = '--' }
        //                         if (remark == null) { remark = '--' }
        //                         if (IP == null) { IP = '--' }
        //                         L.marker(new L.LatLng(data2.data.x, data2.data.y), {
        //                             icon: L.divIcon({
        //                                 html: ' <div class="position" style="' + 'border: .4em solid' + color + ';" > </div>'
        //                             })
        //                         }).addTo(markers).bindPopup('<table class="table table-condensed table-bordered">' +
        //                             '<thead>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">类型</th>' +
        //                             ' <td>' + type + '</td>' +
        //                             '<th style="color:blue">操作一</th>' +
        //                             '<td>' + '<a onclick="cameraDetailOpen1(\'' + data2.data.cameraId + '\')">实时监控</a>' + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">IP</th>' +
        //                             ' <td>' + IP + '</td>' +
        //                             '<th style="color:blue">操作二</th>' +
        //                             '<td>' + '<a onclick="cameraDetailOpen2(\'' + data2.data.cameraId + '\')">监控回放</a>' + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">名称</th>' +
        //                             ' <td>' + name + '</td>' +
        //                             '<th style="color:blue">位置</th>' +
        //                             '<td>' + location + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">备注</th>' +
        //                             ' <td>' + remark + '</td>' +
        //                             '<th style="color:blue">简介</th>' +
        //                             '<td>' + direction + '</td>' +
        //                             '</tr>' +
        //                             '</thead>' +
        //                             '</table>')
        //
        //                     }
        //                 });
        //
        //             }
        //             map.addLayer(markers);
        //             setTimeout("$('#prog').css('width', '0%').text('')", 800)
        //             jbzcIcon = L.icon({
        //                 iconUrl: '../resource/map/img_a.png',
        //                 iconRetinaUrl: '../resource/map/img_a.png',
        //                 iconSize: [29, 32],
        //             });
        //             //清除标注
        //             $("#Clear_Marker").click(function () {
        //                 map.removeLayer(markers);
        //             })
        //         }
        //     })
        //
        //
        // })
        // $("#jiaojing").click(function () {
        //     $("#prog").css("width", "100%").text("正在加载");
        //     $.ajax({
        //         url: SVC_MAP + "/getCameraByType",
        //         type: "get",
        //         data: {
        //             userID: $.cookie("JTZH_userID"),
        //             type: '交警'
        //         },
        //         success: function (data) {
        //
        //             var markers = L.markerClusterGroup();
        //             jkIcon = L.icon({
        //                 iconUrl: '../assets/js/common/leaflet/images/camera_qiuji.png',
        //                 iconRetinaUrl: '../assets/js/common/leaflet/images/camera_qiuji.png',
        //                 iconSize: [29, 32],
        //             });
        //             var markers = L.markerClusterGroup();
        //             var marker = [];
        //             for (var j = 0; j < data.data.length; j++) {
        //                 var popup = L.popup();
        //                 var a = data.data[j];
        //                 var color = data.data[j].color;
        //                 var isOnline = data.data[j].isOnline;
        //                 if (isOnline == '1') {
        //                     color = "#808080"
        //                 }
        //
        //                 $.ajax({
        //                     url: SVC_MAP + "/getCameraByCameraId?",
        //                     type: "get",
        //                     data: {
        //                         cameraId: data.data[j].cameraId,
        //                     },
        //                     success: function (data2) {
        //
        //                         var name = data2.data.name;
        //                         var type = data2.data.type;
        //                         var IP = data2.data.IP;
        //                         var location = data2.data.location;
        //                         var direction = data2.data.direction;
        //                         var remark = data2.data.remark;
        //                         if (location == null) { location = '--' }
        //                         if (direction == null) { direction = '--' }
        //                         if (remark == null) { remark = '--' }
        //                         if (IP == null) { IP = '--' }
        //                         L.marker(new L.LatLng(data2.data.x, data2.data.y), {
        //                             icon: L.divIcon({
        //                                 html: ' <div class="position" style="' + 'border: .4em solid' + color + ';" > </div>'
        //                             })
        //                         }).addTo(markers).bindPopup('<table class="table table-condensed table-bordered">' +
        //                             '<thead>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">类型</th>' +
        //                             ' <td>' + type + '</td>' +
        //                             '<th style="color:blue">操作一</th>' +
        //                             '<td>' + '<a onclick="cameraDetailOpen1(\'' + data2.data.cameraId + '\')">实时监控</a>' + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">IP</th>' +
        //                             ' <td>' + IP + '</td>' +
        //                             '<th style="color:blue">操作二</th>' +
        //                             '<td>' + '<a onclick="cameraDetailOpen2(\'' + data2.data.cameraId + '\')">监控回放</a>' + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">名称</th>' +
        //                             ' <td>' + name + '</td>' +
        //                             '<th style="color:blue">位置</th>' +
        //                             '<td>' + location + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">备注</th>' +
        //                             ' <td>' + remark + '</td>' +
        //                             '<th style="color:blue">简介</th>' +
        //                             '<td>' + direction + '</td>' +
        //                             '</tr>' +
        //                             '</thead>' +
        //                             '</table>')
        //
        //                     }
        //                 });
        //
        //             }
        //             map.addLayer(markers);
        //             setTimeout("$('#prog').css('width', '0%').text('')", 800)
        //             jbzcIcon = L.icon({
        //                 iconUrl: '../resource/map/img_a.png',
        //                 iconRetinaUrl: '../resource/map/img_a.png',
        //                 iconSize: [29, 32],
        //             });
        //             //清除标注
        //             $("#Clear_Marker").click(function () {
        //                 map.removeLayer(markers);
        //             })
        //         }
        //     })
        // })
        // $("#xuexiao").click(function () {
        //     $("#prog").css("width", "100%").text("正在加载");
        //     $.ajax({
        //         url: SVC_MAP + "/getCameraByType",
        //         type: "get",
        //         data: {
        //             userID: $.cookie("JTZH_userID"),
        //             type: '学校'
        //         },
        //         success: function (data) {
        //
        //             var markers = L.markerClusterGroup();
        //             jkIcon = L.icon({
        //                 iconUrl: '../assets/js/common/leaflet/images/camera_qiuji.png',
        //                 iconRetinaUrl: '../assets/js/common/leaflet/images/camera_qiuji.png',
        //                 iconSize: [29, 32],
        //             });
        //             var markers = L.markerClusterGroup();
        //             var marker = [];
        //             for (var j = 0; j < data.data.length; j++) {
        //                 var popup = L.popup();
        //                 var a = data.data[j];
        //                 var color = data.data[j].color;
        //                 var isOnline = data.data[j].isOnline;
        //                 if (isOnline == '1') {
        //                     color = "#808080"
        //                 }
        //
        //                 $.ajax({
        //                     url: SVC_MAP + "/getCameraByCameraId?",
        //                     type: "get",
        //                     data: {
        //                         cameraId: data.data[j].cameraId,
        //                     },
        //                     success: function (data2) {
        //
        //                         var name = data2.data.name;
        //                         var type = data2.data.type;
        //                         var IP = data2.data.IP;
        //                         var location = data2.data.location;
        //                         var direction = data2.data.direction;
        //                         var remark = data2.data.remark;
        //                         if (location == null) { location = '--' }
        //                         if (direction == null) { direction = '--' }
        //                         if (remark == null) { remark = '--' }
        //                         if (IP == null) { IP = '--' }
        //                         L.marker(new L.LatLng(data2.data.x, data2.data.y), {
        //                             icon: L.divIcon({
        //                                 html: ' <div class="position" style="' + 'border: .4em solid' + color + ';" > </div>'
        //                             })
        //                         }).addTo(markers).bindPopup('<table class="table table-condensed table-bordered">' +
        //                             '<thead>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">类型</th>' +
        //                             ' <td>' + type + '</td>' +
        //                             '<th style="color:blue">操作一</th>' +
        //                             '<td>' + '<a onclick="cameraDetailOpen1(\'' + data2.data.cameraId + '\')">实时监控</a>' + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">IP</th>' +
        //                             ' <td>' + IP + '</td>' +
        //                             '<th style="color:blue">操作二</th>' +
        //                             '<td>' + '<a onclick="cameraDetailOpen2(\'' + data2.data.cameraId + '\')">监控回放</a>' + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">名称</th>' +
        //                             ' <td>' + name + '</td>' +
        //                             '<th style="color:blue">位置</th>' +
        //                             '<td>' + location + '</td>' +
        //                             '</tr>' +
        //                             '<tr>' +
        //                             '<th style="color:blue">备注</th>' +
        //                             ' <td>' + remark + '</td>' +
        //                             '<th style="color:blue">简介</th>' +
        //                             '<td>' + direction + '</td>' +
        //                             '</tr>' +
        //                             '</thead>' +
        //                             '</table>')
        //
        //                     }
        //                 });
        //
        //             }
        //             map.addLayer(markers);
        //             setTimeout("$('#prog').css('width', '0%').text('')", 800)
        //             jbzcIcon = L.icon({
        //                 iconUrl: '../resource/map/img_a.png',
        //                 iconRetinaUrl: '../resource/map/img_a.png',
        //                 iconSize: [29, 32],
        //             });
        //             //清除标注
        //             $("#Clear_Marker").click(function () {
        //                 map.removeLayer(markers);
        //             })
        //         }
        //     })
        // })
        // //企业级别叠加
        // $("#levelA").click(function () {
        //     $.ajax({
        //         url: SVC_MAP + "/QueryContract",
        //         type: "get",
        //         data: {
        //             districtID: $.cookie("JTZH_districtID"),
        //             companyLevel: 'A'
        //         },
        //         success: function (data) {
        //
        //             var markers = L.markerClusterGroup();
        //             jkIcon = L.icon({
        //                 iconUrl: '../assets/img/2_map/a.png',
        //                 iconRetinaUrl: '../assets/img/2_map/a.png',
        //                 iconSize: [29, 32],
        //             });
        //             var markers = L.markerClusterGroup();
        //             var marker = [];
        //             for (var j = 0; j < data.rows.length; j++) {
        //                 var a = data.rows[j];
        //                 L.marker(new L.LatLng(data.rows[j].X, data.rows[j].Y), { icon: jkIcon })
        //                     .addTo(markers)
        //                     .bindPopup('<table class="table table-condensed table-bordered table-striped table-compact">' +
        //                         '<thead>' +
        //                         '<tr>' +
        //                         '<th>区域</th>' +
        //                         ' <td >' + a[3] + '</td>' +
        //                         '<th>企业级别</th>' +
        //                         ' <td>' + a[8] + '</td>' +
        //                         '</tr>' +
        //                         '</thead>' +
        //                         '<thead>' +
        //                         '<tr>' +
        //                         '<th>行业</th>' +
        //                         ' <td>' + a[4] + '</td>' +
        //                         '<th>单位名称</th>' +
        //                         ' <td>' + a[5] + '</td>' +
        //
        //                         '</tr>' +
        //                         '</thead>' +
        //                         '<tbody>' +
        //                         '<tr>' +
        //                         '<th>法定代表人</th>' +
        //                         ' <td>' + a[6] + '</td>' +
        //                         '<th>联系电话</th>' +
        //                         ' <td>' + a[7] + '</td>' +
        //
        //                         '</tr>' +
        //                         '<tr >' +
        //                         '<th>企业类型</th>' +
        //                         ' <td>' + a[9] + '</td>' +
        //                         '<th>营业执照注册号</th>' +
        //                         ' <td>' + a[10] + '</td>' +
        //                         '</tr>' +
        //                         '</tbody>' +
        //                         '</table>')
        //             }
        //             map.addLayer(markers);
        //             jbzcIcon = L.icon({
        //                 iconUrl: '../resource/map/img_a.png',
        //                 iconRetinaUrl: '../resource/map/img_a.png',
        //                 iconSize: [29, 32],
        //             });
        //             //清除标注
        //             $("#Clear_Marker").click(function () {
        //                 map.removeLayer(markers);
        //             })
        //         }
        //     })
        // })
        // $("#levelB").click(function () {
        //     $.ajax({
        //         url: SVC_MAP + "/QueryContract",
        //         type: "get",
        //         data: {
        //             districtID: $.cookie("JTZH_districtID"),
        //             companyLevel: 'B'
        //         },
        //         success: function (data) {
        //
        //             var markers = L.markerClusterGroup();
        //             jkIcon = L.icon({
        //                 iconUrl: '../assets/img/2_map/b.png',
        //                 iconRetinaUrl: '../assets/img/2_map/b.png',
        //                 iconSize: [29, 32],
        //             });
        //             var markers = L.markerClusterGroup();
        //             var marker = [];
        //             for (var j = 0; j < data.rows.length; j++) {
        //                 var a = data.rows[j];
        //                 L.marker(new L.LatLng(data.rows[j].X, data.rows[j].Y), { icon: jkIcon })
        //                     .addTo(markers)
        //                     .bindPopup('<table class="table table-condensed table-bordered table-striped table-compact">' +
        //                         '<thead>' +
        //                         '<tr>' +
        //                         '<th>区域</th>' +
        //                         ' <td >' + a[3] + '</td>' +
        //                         '<th>企业级别</th>' +
        //                         ' <td>' + a[8] + '</td>' +
        //                         '</tr>' +
        //                         '</thead>' +
        //                         '<thead>' +
        //                         '<tr>' +
        //                         '<th>行业</th>' +
        //                         ' <td>' + a[4] + '</td>' +
        //                         '<th>单位名称</th>' +
        //                         ' <td>' + a[5] + '</td>' +
        //
        //                         '</tr>' +
        //                         '</thead>' +
        //                         '<tbody>' +
        //                         '<tr>' +
        //                         '<th>法定代表人</th>' +
        //                         ' <td>' + a[6] + '</td>' +
        //                         '<th>联系电话</th>' +
        //                         ' <td>' + a[7] + '</td>' +
        //
        //                         '</tr>' +
        //                         '<tr >' +
        //                         '<th>企业类型</th>' +
        //                         ' <td>' + a[9] + '</td>' +
        //                         '<th>营业执照注册号</th>' +
        //                         ' <td>' + a[10] + '</td>' +
        //                         '</tr>' +
        //                         '</tbody>' +
        //                         '</table>')
        //             }
        //             map.addLayer(markers);
        //             jbzcIcon = L.icon({
        //                 iconUrl: '../resource/map/img_a.png',
        //                 iconRetinaUrl: '../resource/map/img_a.png',
        //                 iconSize: [29, 32],
        //             });
        //             //清除标注
        //             $("#Clear_Marker").click(function () {
        //                 map.removeLayer(markers);
        //             })
        //         }
        //     })
        // })
        // $("#levelC").click(function () {
        //     $.ajax({
        //         url: SVC_MAP + "/QueryContract",
        //         type: "get",
        //         data: {
        //             districtID: $.cookie("JTZH_districtID"),
        //             companyLevel: 'C'
        //         },
        //         success: function (data) {
        //
        //             var markers = L.markerClusterGroup();
        //             jkIcon = L.icon({
        //                 iconUrl: '../assets/img/2_map/c.png',
        //                 iconRetinaUrl: '../assets/img/2_map/c.png',
        //                 iconSize: [29, 32],
        //             });
        //             var markers = L.markerClusterGroup();
        //             var marker = [];
        //             for (var j = 0; j < data.rows.length; j++) {
        //                 var a = data.rows[j];
        //                 L.marker(new L.LatLng(data.rows[j].X, data.rows[j].Y), { icon: jkIcon })
        //                     .addTo(markers)
        //                     .bindPopup('<table class="table table-condensed table-bordered table-striped table-compact">' +
        //                         '<thead>' +
        //                         '<tr>' +
        //                         '<th>区域</th>' +
        //                         ' <td >' + a[3] + '</td>' +
        //                         '<th>企业级别</th>' +
        //                         ' <td>' + a[8] + '</td>' +
        //                         '</tr>' +
        //                         '</thead>' +
        //                         '<thead>' +
        //                         '<tr>' +
        //                         '<th>行业</th>' +
        //                         ' <td>' + a[4] + '</td>' +
        //                         '<th>单位名称</th>' +
        //                         ' <td>' + a[5] + '</td>' +
        //
        //                         '</tr>' +
        //                         '</thead>' +
        //                         '<tbody>' +
        //                         '<tr>' +
        //                         '<th>法定代表人</th>' +
        //                         ' <td>' + a[6] + '</td>' +
        //                         '<th>联系电话</th>' +
        //                         ' <td>' + a[7] + '</td>' +
        //
        //                         '</tr>' +
        //                         '<tr >' +
        //                         '<th>企业类型</th>' +
        //                         ' <td>' + a[9] + '</td>' +
        //                         '<th>营业执照注册号</th>' +
        //                         ' <td>' + a[10] + '</td>' +
        //                         '</tr>' +
        //                         '</tbody>' +
        //                         '</table>')
        //             }
        //             map.addLayer(markers);
        //             jbzcIcon = L.icon({
        //                 iconUrl: '../resource/map/img_a.png',
        //                 iconRetinaUrl: '../resource/map/img_a.png',
        //                 iconSize: [29, 32],
        //             });
        //             //清除标注
        //             $("#Clear_Marker").click(function () {
        //                 map.removeLayer(markers);
        //             })
        //         }
        //     })
        // })
        // //企业类型叠加
        // $("#muzhipin").click(function () {
        //     $.ajax({
        //         url: SVC_MAP + "/QueryCompanybyType",
        //         type: "get",
        //         data: {
        //             districtID: $.cookie("JTZH_districtID"),
        //             business: '木制品加工行业'
        //         },
        //         success: function (data) {
        //
        //             var markers = L.markerClusterGroup();
        //             jkIcon = L.icon({
        //                 iconUrl: '../assets/img/2_map/mu.png',
        //                 iconRetinaUrl: '../assets/img/2_map/mu.png',
        //                 iconSize: [29, 32],
        //             });
        //             var markers = L.markerClusterGroup();
        //             var marker = [];
        //             for (var j = 0; j < data.rows.length; j++) {
        //                 var a = data.rows[j];
        //                 L.marker(new L.LatLng(data.rows[j].X, data.rows[j].Y), { icon: jkIcon })
        //                     .addTo(markers)
        //                     .bindPopup('<table class="table table-condensed table-bordered table-striped table-compact">' +
        //                         '<thead>' +
        //                         '<tr>' +
        //                         '<th>区域</th>' +
        //                         ' <td >' + a[3] + '</td>' +
        //                         '<th>企业级别</th>' +
        //                         ' <td>' + a[8] + '</td>' +
        //                         '</tr>' +
        //                         '</thead>' +
        //                         '<thead>' +
        //                         '<tr>' +
        //                         '<th>行业</th>' +
        //                         ' <td>' + a[4] + '</td>' +
        //                         '<th>单位名称</th>' +
        //                         ' <td>' + a[5] + '</td>' +
        //
        //                         '</tr>' +
        //                         '</thead>' +
        //                         '<tbody>' +
        //                         '<tr>' +
        //                         '<th>法定代表人</th>' +
        //                         ' <td>' + a[6] + '</td>' +
        //                         '<th>联系电话</th>' +
        //                         ' <td>' + a[7] + '</td>' +
        //
        //                         '</tr>' +
        //                         '<tr >' +
        //                         '<th>企业类型</th>' +
        //                         ' <td>' + a[9] + '</td>' +
        //                         '<th>营业执照注册号</th>' +
        //                         ' <td>' + a[10] + '</td>' +
        //                         '</tr>' +
        //                         '</tbody>' +
        //                         '</table>')
        //             }
        //             map.addLayer(markers);
        //             jbzcIcon = L.icon({
        //                 iconUrl: '../resource/map/img_a.png',
        //                 iconRetinaUrl: '../resource/map/img_a.png',
        //                 iconSize: [29, 32],
        //             });
        //             //清除标注
        //             $("#Clear_Marker").click(function () {
        //                 map.removeLayer(markers);
        //             })
        //         }
        //     })
        // })
        // $("#caigangban").click(function () {
        //     $.ajax({
        //         url: SVC_MAP + "/QueryCompanybyType",
        //         type: "get",
        //         data: {
        //             districtID: $.cookie("JTZH_districtID"),
        //             business: '彩钢板活动房行业'
        //         },
        //         success: function (data) {
        //
        //             var markers = L.markerClusterGroup();
        //             jkIcon = L.icon({
        //                 iconUrl: '../assets/img/2_map/caigang.png',
        //                 iconRetinaUrl: '../assets/img/2_map/caigang.png',
        //                 iconSize: [29, 32],
        //             });
        //             var markers = L.markerClusterGroup();
        //             var marker = [];
        //             for (var j = 0; j < data.rows.length; j++) {
        //                 var a = data.rows[j];
        //                 L.marker(new L.LatLng(data.rows[j].X, data.rows[j].Y), { icon: jkIcon })
        //                     .addTo(markers)
        //                     .bindPopup('<table class="table table-condensed table-bordered table-striped table-compact">' +
        //                         '<thead>' +
        //                         '<tr>' +
        //                         '<th>区域</th>' +
        //                         ' <td >' + a[3] + '</td>' +
        //                         '<th>企业级别</th>' +
        //                         ' <td>' + a[8] + '</td>' +
        //                         '</tr>' +
        //                         '</thead>' +
        //                         '<thead>' +
        //                         '<tr>' +
        //                         '<th>行业</th>' +
        //                         ' <td>' + a[4] + '</td>' +
        //                         '<th>单位名称</th>' +
        //                         ' <td>' + a[5] + '</td>' +
        //
        //                         '</tr>' +
        //                         '</thead>' +
        //                         '<tbody>' +
        //                         '<tr>' +
        //                         '<th>法定代表人</th>' +
        //                         ' <td>' + a[6] + '</td>' +
        //                         '<th>联系电话</th>' +
        //                         ' <td>' + a[7] + '</td>' +
        //
        //                         '</tr>' +
        //                         '<tr >' +
        //                         '<th>企业类型</th>' +
        //                         ' <td>' + a[9] + '</td>' +
        //                         '<th>营业执照注册号</th>' +
        //                         ' <td>' + a[10] + '</td>' +
        //                         '</tr>' +
        //                         '</tbody>' +
        //                         '</table>')
        //             }
        //             map.addLayer(markers);
        //             jbzcIcon = L.icon({
        //                 iconUrl: '../resource/map/img_a.png',
        //                 iconRetinaUrl: '../resource/map/img_a.png',
        //                 iconSize: [29, 32],
        //             });
        //             //清除标注
        //             $("#Clear_Marker").click(function () {
        //                 map.removeLayer(markers);
        //             })
        //         }
        //     })
        // })
        // /*------------关闭-------------*/
        // $('#population_detail .population_detail-close').click(function () {
        //     $('#playReal').html('');
        //     $('#population_detail').animate({
        //         //right: '20px',
        //         height: '50px',
        //         width: '50px',
        //     });
        //
        //     $('#population_detail').fadeOut()
        // });
        //
        //
        //
        // /*------------缩放事件-------------*/
        // function zoomendEvent() {
        //     var zoom = map.getZoom();
        //
        //
        // }
        // function switchTypeShow() {
        //     var zoom = map.getZoom();
        //
        //
        //     if (zoom == 4) {
        //         //  map.removeLayer(poly);
        //
        //         $.ajax({
        //             url: SVC_MAP + "/getDistrict",
        //             type: "GET",
        //             data: {
        //                 districtID: $.cookie("JTZH_districtID"),
        //                 zoom: 4
        //             },
        //             success: function (data) {
        //
        //                 if (data.success == true) {
        //                     for (var i in data.data) {
        //                         var latlng = new L.LatLng(data.data[i].x, data.data[i].y);
        //                         map.setView(latlng, 3);
        //                         var ss = data.data[i].Area.split("@");
        //                         var latlngs = new Array();
        //                         for (var j in ss) {
        //                             var kk = ss[j].split(",");
        //                             var nn = new Array();
        //                             nn[0] = kk[0] * 1;
        //                             nn[1] = kk[1] * 1;
        //                             latlngs.push(nn);
        //                         }
        //                         L.marker([data.data[i].x, data.data[i].y]).addTo(map).bindPopup(data.data[i].districtName).openPopup();
        //                         //var pp = L.polygon(latlngs, {
        //                         //    color: '#2194fe',
        //                         //    fill: true,
        //                         //    fillColor: getRandomColor(),
        //                         //    fillOpacity: 0.4
        //                         //})
        //                         //pp.on('click', function (e) {
        //                         //    console.log(e);
        //                         //    alert('纬度：' + e.latlng.lat + '\n经度：' + e.latlng.lng);
        //                         //}).addTo(map);
        //                         var poly = new L.Polygon(latlngs);
        //                         map.addLayer(poly).on('click', function (e) {
        //
        //                             alert('纬度：' + e.latlng.lat + '\n经度：' + e.latlng.lng);
        //                         });
        //                         //清空
        //                         poly_points = [];
        //                         poly_line = new L.Polyline([]);
        //                     }
        //                 }
        //             },
        //         })
        //     }
        // }
        //
        // var to = function () {
        //     var getval = document.getElementById("contract_ID").value;
        //     window.open("detail.html?id=" + encodeURI('123'));
        // }
        // /*------------叠加区域--------------*/
        // function addDistrict() {
        //     // var zoom = map.getZoom();
        //     $.ajax({
        //         url: SVC_MAP + "/getDistrict",
        //         type: "GET",
        //         data: {
        //             userID: $.cookie("JTZH_userID"),
        //             districtID: $.cookie("JTZH_districtID"),
        //             zoom: $.cookie("JTZH_districtLevel")
        //         },
        //         success: function (data) {
        //
        //             if (data.success == true) {
        //                 for (var i in data.data) {
        //                     var latlng = new L.LatLng(data.data[i].x, data.data[i].y);
        //                     map.setView(latlng, 3);
        //                     var ss = data.data[i].Area.split("@");
        //                     var latlngs = new Array();
        //                     for (var j in ss) {
        //                         var kk = ss[j].split(",");
        //                         var nn = new Array();
        //                         nn[0] = kk[0] * 1;
        //                         nn[1] = kk[1] * 1;
        //                         latlngs.push(nn);
        //                     }
        //                     L.marker([data.data[i].x, data.data[i].y], { icon: shi }).addTo(map).bindPopup(data.data[i].districtName);
        //                     var shiName = data.data[i].districtName;
        //                     var poly = new L.Polygon(latlngs);
        //                     map.addLayer(poly).on('zoomend', function (e) {
        //                         if (map.getZoom() == 4) {
        //                             $.ajax({
        //                                 url: SVC_MAP + "/getDistrict",
        //                                 type: "GET",
        //                                 data: {
        //                                     userID: $.cookie("JTZH_userID"),
        //                                     districtID: $.cookie("JTZH_districtID"),
        //                                     zoom: 4
        //                                 },
        //                                 success: function (data2) {
        //                                     cleanLayer(map);
        //                                     // map.removeLayer(poly);
        //                                     if (data2.success == true) {
        //                                         for (var i in data2.data) {
        //                                             var latlng2 = new L.LatLng(data2.data[i].x, data2.data[i].y);
        //                                             map.setView(latlng, 4);
        //                                             var ss = data2.data[i].Area.split("@");
        //                                             var latlngs1 = new Array();
        //                                             for (var j in ss) {
        //                                                 var kk = ss[j].split(",");
        //                                                 var nn = new Array();
        //                                                 nn[0] = kk[0] * 1;
        //                                                 nn[1] = kk[1] * 1;
        //                                                 latlngs1.push(nn);
        //                                             }
        //                                             L.marker([data2.data[i].x, data2.data[i].y], {
        //                                                 icon: L.divIcon({
        //                                                     html: '<div style="width:40px; height:40px; background-color:#F00; border-radius:20px;">' +
        //                                                     '<span style="height:40px; line-height:40px;font-size:15px; display:block; color:#FFF; text-align:center">' + data2.data[i].total + '</span>' +
        //                                                     '</div>'
        //                                                 })
        //                                             }).addTo(map).bindPopup(data2.data[i].districtName).openPopup();
        //                                             var poly2 = new L.Polygon(latlngs1);
        //                                             map.addLayer(poly2).on('zoomend', function (e) {
        //                                                 if (map.getZoom() == 5) {
        //                                                     $.ajax({
        //                                                         url: SVC_MAP + "/getDistrict",
        //                                                         type: "GET",
        //                                                         data: {
        //                                                             userID: $.cookie("JTZH_userID"),
        //                                                             districtID: $.cookie("JTZH_districtID"),
        //                                                             zoom: 5
        //                                                         },
        //                                                         success: function (data3) {
        //                                                             cleanLayer(map);
        //                                                             // map.removeLayer(poly2);
        //                                                             if (data3.success == true) {
        //                                                                 for (var i in data3.data) {
        //                                                                     var latlng3 = new L.LatLng(data3.data[i].x, data3.data[i].y);
        //                                                                     map.setView(latlng, 5);
        //                                                                     var ss = data3.data[i].Area.split("@");
        //                                                                     var latlngs3 = new Array();
        //                                                                     for (var j in ss) {
        //                                                                         var kk = ss[j].split(",");
        //                                                                         var nn = new Array();
        //                                                                         nn[0] = kk[0] * 1;
        //                                                                         nn[1] = kk[1] * 1;
        //                                                                         latlngs3.push(nn);
        //                                                                     }
        //                                                                     L.marker([data3.data[i].x, data3.data[i].y], { icon: cun }).addTo(map).bindPopup(data3.data[i].districtName).openPopup();
        //                                                                     var poly3 = new L.Polygon(latlngs3);
        //                                                                     map.addLayer(poly3).on('zoomend', function (e) {
        //                                                                         if (map.getZoom() == 4) {
        //                                                                             map.removeLayer(poly3);
        //                                                                         }
        //                                                                     })
        //                                                                     //清除标注
        //                                                                     $("#Clear_Marker").click(function () {
        //                                                                         cleanLayer(map);
        //
        //                                                                     })
        //                                                                 }
        //                                                             }
        //                                                         }
        //                                                     })
        //                                                 } else if (map.getZoom() == 3) {
        //                                                     cleanLayer(map);
        //                                                     L.marker(latlng, { icon: shi }).addTo(map).bindPopup(shiName);
        //                                                     map.addLayer(poly).on('zoomend', function (e) {
        //                                                         if (map.getZoom() == 4) {
        //                                                             cleanLayer(map);
        //                                                         }
        //                                                     })
        //                                                     //清除标注
        //                                                     $("#Clear_Marker").click(function () {
        //                                                         cleanLayer(map);
        //
        //                                                     })
        //                                                 }
        //                                             });
        //                                             //清除标注
        //                                             $("#Clear_Marker").click(function () {
        //                                                 map.removeLayer(poly2);
        //                                             })
        //                                         }
        //                                     }
        //                                 }
        //                             })
        //
        //                         }
        //
        //                         // alert('纬度：' + e.latlng.lat + '\n经度：' + e.latlng.lng);
        //                     })
        //                     //清除标注
        //                     $("#Clear_Marker").click(function () {
        //                         map.removeLayer(poly);
        //                     })
        //
        //                 }
        //             }
        //
        //         },
        //     })
        // }
        // function addCamera(type) {
        //     $.ajax({
        //         url: SVC_SYS + "/getCameraByType",
        //         type: "get",
        //         data: {
        //             userID: $.cookie("JTZH_userID"),
        //             type: type
        //         },
        //         success: function (data) {
        //
        //         }
        //     })
        //     var markers = L.markerClusterGroup();
        //     jkIcon = L.icon({
        //         iconUrl: '../assets/js/common/leaflet/images/camera_qiuji.png',
        //         iconRetinaUrl: '../assets/js/common/leaflet/images/camera_qiuji.png',
        //         iconSize: [29, 32],
        //     });
        //     var markers = L.markerClusterGroup();
        //     var marker = [];
        //     for (var j = 0; j < jiankongPoints.length; j++) {
        //         var a = jiankongPoints[j];
        //
        //         L.marker(new L.LatLng(a[0], a[1]), { icon: jkIcon })
        //             .addTo(markers)
        //             .bindPopup('<table class="table table-condensed table-bordered">' +
        //                 '<thead>' +
        //                 '<tr>' +
        //                 '<th style="color:blue">位置</th>' +
        //                 ' <td>' + a[3] + '</td>' +
        //                 '<th style="color:blue">操作</th>' +
        //                 '<td>' + '<a href=' + a[2] + ' target="_blank">查看监控</a>' + '</td>' +
        //                 '</tr>' +
        //                 '</thead>' +
        //                 '</table>')
        //     }
        //     map.addLayer(markers);
        //     jbzcIcon = L.icon({
        //         iconUrl: '../resource/map/img_a.png',
        //         iconRetinaUrl: '../resource/map/img_a.png',
        //         iconSize: [29, 32],
        //     });
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