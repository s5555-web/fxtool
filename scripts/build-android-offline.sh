#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
: "${ANDROID_HOME:?Set ANDROID_HOME to Android SDK directory}"
tools="$ANDROID_HOME/build-tools/35.0.0"
platform="$ANDROID_HOME/platforms/android-35/android.jar"
build="release/android-build"
mkdir -p "$build/classes" "$build/dex" "$build/assets/public"
cp -R dist/. "$build/assets/public/"
"$tools/aapt2" compile --dir native-android/res -o "$build/resources.zip"
"$tools/aapt2" link -o "$build/base.apk" -I "$platform" --manifest native-android/AndroidManifest.xml -A "$build/assets" -R "$build/resources.zip"
javac -source 8 -target 8 -classpath "$platform" -d "$build/classes" native-android/MainActivity.java
find "$build/classes" -name '*.class' > "$build/classes.list"
"$tools/d8" --lib "$platform" --min-api 24 --output "$build/dex" @"$build/classes.list"
cp "$build/base.apk" "$build/unsigned.apk"
jar uf "$build/unsigned.apk" -C "$build/dex" classes.dex
"$tools/zipalign" -f 4 "$build/unsigned.apk" "$build/aligned.apk"
if [ ! -f "$build/debug.keystore" ]; then
 keytool -genkeypair -keystore "$build/debug.keystore" -storepass android -keypass android -alias androiddebugkey -dname 'CN=Android Debug,O=Android,C=US' -keyalg RSA -keysize 2048 -validity 10000
fi
"$tools/apksigner" sign --ks "$build/debug.keystore" --ks-pass pass:android --key-pass pass:android --out release/fxtool-android.apk "$build/aligned.apk"
"$tools/apksigner" verify --verbose release/fxtool-android.apk
