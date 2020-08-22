var jsonModel = (function() {
  var k = "",
    l = "",
    v = "",
    m = "",
    w = "",
    n = "",
    p = function(a) {
      return a.replace(/\b[a-z]/g, function(a) {
        return a.toUpperCase();
      });
    },
    B = function(a) {
      return a.replace(/\b[a-z]/g, function(a) {
        return a.toLowerCase();
      });
    },
    q = function(a) {
      return a instanceof Object ?
        a.constructor.prototype.hasOwnProperty("push") :
        !1;
    },
    r = function(a) {
      return a instanceof Object ?
        !a.constructor.prototype.hasOwnProperty("push") :
        !1;
    },
    C = function() {
      n = w = m = v = l = k = "";
    },
    D = function() {
      var a = editor_json.getValue().trim();
      try {
        var d = jsonlint.parse(a);
        if (d) {
          document
            .getElementById("result-container")
            .setAttribute("class", "shown");
          document.getElementById("result").innerHTML = "JSON is valid!";
          document.getElementById("result").setAttribute("class", "alert-success");
          var c = JSON.stringify(d, null, "  ");
          editor_json.setValue(c);
          return !0;
        }
      } catch (e) {
        return (
          document
          .getElementById("result-container")
          .setAttribute("class", "shown"),
          (document.getElementById("result").innerHTML = e),
          (document.getElementById("result").setAttribute("class", "alert-error")),
          !1
        );
      }
    },
    F = function(a) {
      return " public class " + a + "{\r\n";
    },
    I = function(a, d) {
      C();
      0 == d.length && (d = "RestClass");
      var c = z(a, "JSONResponse");
      //End code
      c = v = F("JSONResponse") + c + "}" + "\r\n";
      0 < m.length && (c = m + "\r\n" + v);
      var codePre = document.createElement('pre');
      var e = document.createElement("code");

      returnType = document.getElementById("returnType").value.trim() || "void";
      methodName = document.getElementById("methodName").value.trim() || "methodName";
      getEndPoint = document.getElementById("endPointUrl").value || "https://admin2dev.com/rest/response.json";

      genMainClass = "public class " + d + "{\n\n";
      genHttpClass =
        " public static " + returnType + " " + methodName + "(){\n ";
      genEndPoint = `\tString requestURL = \'${getEndPoint}\'\;\n`;
      genReqType = "\tString requestType = 'GET';\n\n";
      genHttpVar = "\tHttp http = new Http();\n";
      genHttpRequest = "\tHttpRequest request = new HttpRequest();\n";
      genReqSet = "\trequest.setEndPoint(requestURL);\n";
      genMetSet = "\trequest.setMethod(requestType);\n";
      genResponse = "\tHttpResponse response = http.send(request);\n\n";

      genJsonResponse =
        "\tJSONResopnse result = (JSONResponse) JSON.desearlize(response.getBody(), JSONResponse.class);\n";
      genResponseReturn =
        "\treturn result.\; //Your response result from JSON goes here.";

      c =
        genMainClass +
        c +
        genHttpClass +
        genEndPoint +
        genReqType +
        genHttpVar +
        genHttpRequest +
        genReqSet +
        genMetSet +
        genResponse +
        genJsonResponse +
        genResponseReturn +
        "\n }\n}";

      codePre.append(e);
      e.append(c);
      document.getElementById("precode").appendChild(codePre);
      prettyPrint();
    },
    z = function(a, d) {
      var c = "";
      if (q(a)) {
        if (0 < a.length && 0 < a.length) {
          for (var e = a[0], f = a.length - 1; 0 <= f; f--) {
            var b = a[f];
            q(b) ?
              b.length > e.length && (e = b) :
              r(b) &&
              Object.keys(b).length > Object.keys(e).length &&
              (e = b);
          }
          c += z(e, d);
        }
      } else if (r(a))
        for (e in a) {
          b = a[e];
          var h = p(e),
            g = B(e);
          q(b) ?
            (0 < b.length && (f = b[0]),
              "string" === typeof f ?
              (c += "\tpublic String " + g + ";\r\n") :
              "number" === typeof f || "boolean" === typeof f ?
              (c += "\tpublic integer " + g + ";\r\n") :
              "object" === typeof f &&
              ((c += "\tpublic List<" + h + "> " + g + ";\r\n"),
                (b = F(h) + z(b, e) + "}\r\n"),
                (m = 0 < m.length ? m + "\r\n" + b : b))) :
            r(b) ?
            ((b = F(p(g)) + z(b, e) + "}\r\n"),
              (m = 0 < m.length ? m + "\r\n" + b : b)) :
            "string" === typeof b ?
            (c += "\tpublic String " + g + ";\r\n") :
            "number" === typeof b ?
            (c =
              0 <= b.toString().indexOf(".") ?
              c + ("\tpublic double " + g + ";\r\n") :
              c + ("\tpublic integer " + g + ";\r\n")) :
            "boolean" === typeof b &&
            (c += "\tpublic boolean " + g + ";\r\n");
        }
      else alert("key = " + d);
      return c;
    },
    A = function(a, d) {
      var c = "";
      if (q(a)) {
        if (0 < a.length && 0 < a.length) {
          for (var e = a[0], f = a.length - 1; 0 <= f; f--) {
            var b = a[f];
            q(b) ?
              b.length > e.length && (e = b) :
              r(b) &&
              Object.keys(b).length > Object.keys(e).length &&
              (e = b);
          }
          c += A(e, d);
        }
      }
      return c;
    };
  return {
    apexModel: function() {
      this.clearContent();
      D();
      var a = document.getElementById("mainClassName").value.trim(),
        d = editor_json.getValue();
      d = eval("(" + d + ")");
      I(d, p(a));
    },
    clearContent: function() {
      document.getElementById("result-container").removeAttribute("class");
      document.getElementById("precode").innerHTML = "";
    },
  };
})();
