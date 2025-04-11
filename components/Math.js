import { Asset } from 'expo-asset';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';


export default function Math({ formulas }) {
    const [katexCssUri, setKatexCssUri] = useState(null);
  const [katexJsUri, setKatexJsUri] = useState(null);




  return (
    <>
      {formulas.map((item, index) => (
        <View key={index} style={{ marginBottom: 30 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.title}</Text>
          {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.11/katex.min.css">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.11/katex.min.js"></script> */}
          {/* Render LaTeX using WebView for KaTeX */}
          <WebView
            originWhitelist={['*']}
            source={{
              html: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="utf-8">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.11/katex.min.css">
                  <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.11/katex.min.js"></script> 
                  </head>
                  <body style="margin: 0; padding: 0; background: transparent;">
                    <div id="math" style="font-size: 50px; text-align: center; margin-top: 20px;"></div>
                    <script>
                      window.onload = function() {
                        try {
                          // Debugging: log LaTeX string to console
                          console.log('Rendering LaTeX:', '${item.latex}');
                          katex.render('${item.latex}', document.getElementById('math'), {
                            throwOnError: false
                          });
                        } catch (e) {
                          console.error('Error rendering LaTeX:', e);
                          alert('Error rendering LaTeX');
                        }
                      }
                    </script>
                  </body>
                </html>
              `,
            }}
            style={{ height: 50, width: '100%' }}
            javaScriptEnabled={true}  // Enable JavaScript
            domStorageEnabled={true}  // Enable DOM storage for KaTeX
          />

          <Text style={{ marginTop: 10, color: 'gray' }}>Example:</Text>

          {/* Render Example LaTeX using WebView for KaTeX */}
          <WebView
            originWhitelist={['*']}
            source={{
              html: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="utf-8">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.11/katex.min.css">
                  <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.11/katex.min.js"></script> 
                  </head>
                  <body style="margin: 0; padding: 0; background: transparent;">
                    <div id="math" style="font-size: 50px; text-align: center; margin-top: 20px;"></div>
                    <script>
                      window.onload = function() {
                        try {
                          // Debugging: log Example LaTeX string to console
                          console.log('Rendering Example:', '${item.example}');
                          katex.render('${item.example}', document.getElementById('math'), {
                            throwOnError: false
                          });
                        } catch (e) {
                          console.error('Error rendering Example:', e);
                          alert('Error rendering Example' + e);
                        }
                      }
                    </script>
                  </body>
                </html>
              `,
            }}
            style={{ height: 150, width: '100%' }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
      ))}
    </>
  );
}
