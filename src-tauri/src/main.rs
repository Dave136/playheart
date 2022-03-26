#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod commands;

use commands::get_songs;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_songs])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
