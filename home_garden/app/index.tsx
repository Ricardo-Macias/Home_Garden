import { Buffer } from "buffer";
global.Buffer = Buffer;

import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
  return <Redirect href="/home" />;
}
