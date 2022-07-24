# File Uploader

**Overview:**

This project allows users to easily test **_multipart_** file uploads. Enter your credentials, select a file, and upload.

**How It Works:**

- Redux Store
  - http: Edit the values in the form
    - url: `https://localhost:3000`
    - route: `/upload`
    - type: `'PUT' || 'POST'`
    - client: `'Axios' || 'Background Uploader' || 'RNFS'`
  - uploads
    - uploadQueue: array of uploads, tracks status
    - uploadProgressArray: array of uploads, tracks upload progress

---

## Props

### HTTP: All Required

- **url:** `https://api.test.com`
- **route:** `/extended-route`
- **reqType:** `PUT || POST`

### Header: Not Required

- **token:** Paste a token into the token field for protected routes
  - Note: Token should not include `Bearer`

### HTTP: Pre-Configured Clients

**[Axios](https://github.com/axios/axios)**

- HTTP request accepts a single file as payload

**[React Native Background Upload](https://github.com/Vydia/react-native-background-upload)**

- HTTP request accepts a single file as payload

**[RNFS](https://github.com/itinance/react-native-fs)**

- HTTP request accepts an array files as payload
