#[tauri::command]
pub fn get_songs(files_path: String) {
  println!("The files of songs are: {}", files_path);
}
