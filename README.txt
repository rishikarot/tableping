TablePing v1.2.1

Supabase multi-user pilot.

User-facing setup terms:
- Business Code
- Setup Key

Login:
- Username
- PIN
- Example username: johndoe

Connectivity:
- Live: connected to Supabase
- Syncing: refreshing/saving
- Offline: showing the last locally cached state
- Offline is VIEW-ONLY in this release.
- Writes are blocked offline to avoid duplicate table allocations/conflicts.
- On reconnect, TablePing automatically loads the latest Supabase state.

Full offline write/sync is NOT supported yet.
A production offline-write version should use a durable action queue/event sync model rather than whole-state overwrite.
