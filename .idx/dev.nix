# Firebase Studio (IDX) workspace configuration
# Week 2 - Leaderboard with Firebase
# AI Developers Course - Lisbon AI Programs
{ pkgs, ... }: {
  channel = "stable-23.11";

  # Only Python needed - serves our vanilla HTML/CSS/JS files
  # No Node.js = less temptation for Gemini to suggest npm/frameworks
  packages = [
    pkgs.python3
  ];

  env = {};

  idx = {
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
    ];

    previews = {
      enable = true;
      previews = {
        web = {
          command = ["python3" "-m" "http.server" "$PORT" "--bind" "0.0.0.0"];
          manager = "web";
        };
      };
    };

    workspace = {
      onCreate = {};
      onStart = {};
    };
  };
}
