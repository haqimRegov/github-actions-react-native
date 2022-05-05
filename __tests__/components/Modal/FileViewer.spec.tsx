import { render } from "@testing-library/react-native";
import React from "react";

import { FileViewer } from "../../../src/components";

it("render FileViewer not visible, resourceType url", () => {
  const testFile = { url: "https://tinyurl.com/2p8fwnab", name: "test" };
  const mockFn = jest.fn();
  render(<FileViewer handleClose={mockFn} resourceType="url" value={testFile} visible={false} />);
});

it("render FileViewer visible, resourceType url", () => {
  const testFile = { url: "https://tinyurl.com/2p8fwnab", name: "test" };
  const mockFn = jest.fn();
  render(<FileViewer handleClose={mockFn} resourceType="url" value={testFile} visible={true} />);
});

it("render FileViewer not visible, resourceType base64", () => {
  const testFile = { base64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", name: "test" };
  const mockFn = jest.fn();
  render(<FileViewer handleClose={mockFn} resourceType="url" value={testFile} visible={false} />);
});

it("render FileViewer visible, resourceType base64", () => {
  const testFile = { base64: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", name: "test" };
  const mockFn = jest.fn();
  render(<FileViewer handleClose={mockFn} resourceType="url" value={testFile} visible={true} />);
});
