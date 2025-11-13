# Post-Rename Checklist

**Repository renamed**: `Flow-Arto` → `flow-studio`
**Date**: 2025-11-13

This checklist ensures all path references are updated after the GitHub repository rename.

---

## ✅ Task List

### 1. Verify Rename Completed
- [ ] Check GitHub repository URL is now `github.com/ricopoulos/flow-studio`
- [ ] Local git remote updated: `git remote -v` shows new URL
- [ ] GitHub Pages URL changed to `ricopoulos.github.io/flow-studio/`

### 2. Update File Path References

#### `/index.html`
- [ ] Line 223: Change `/Flow-Arto/web/carlton-select/` → `/flow-studio/web/carlton-select/`
- [ ] Line 224: Change `github.com/ricopoulos/Flow-Arto/tree/` → `github.com/ricopoulos/flow-studio/tree/`
- [ ] Line 248: Change `/Flow-Arto/web/flow-studio/` → `/flow-studio/web/flow-studio/`
- [ ] Line 249: Change `github.com/ricopoulos/Flow-Arto/tree/` → `github.com/ricopoulos/flow-studio/tree/`

#### `/docs/PREVIEW.md`
- [ ] Line 5: Update base URL to `https://ricopoulos.github.io/flow-studio/`
- [ ] Line 12: Update hub URL
- [ ] Line 19: Update Carlton Select URL
- [ ] Line 27: Update Flow Studio URL
- [ ] Line 47: Update URL pattern
- [ ] Update all GitHub repo links

### 3. Create/Update Documentation
- [ ] Create or update `/README.md` with Flow Studio description
- [ ] Verify `.claude/claude.md` is accurate (already created)

### 4. Commit Changes
```bash
# Create a new feature branch
git checkout -b claude/post-rename-path-updates-<sessionId>

# Stage updated files
git add index.html docs/PREVIEW.md README.md POST_RENAME_CHECKLIST.md

# Commit
git commit -m "Update all URLs after repository rename: Flow-Arto → flow-studio"

# Push
git push -u origin claude/post-rename-path-updates-<sessionId>

# Merge to main (via PR or direct)
```

### 5. Verify Deployment
- [ ] Check GitHub Actions deployment status
- [ ] Visit `https://ricopoulos.github.io/flow-studio/` - should load hub page
- [ ] Click Carlton Select link - should work
- [ ] Click Flow Studio link - should work
- [ ] Hard refresh (Ctrl+Shift+R) to clear cache if needed

### 6. Test All URLs Manually
- [ ] `https://ricopoulos.github.io/flow-studio/` ✓
- [ ] `https://ricopoulos.github.io/flow-studio/web/carlton-select/` ✓
- [ ] `https://ricopoulos.github.io/flow-studio/web/flow-studio/` ✓

---

## Expected File Changes

### index.html
**Total changes**: 4 occurrences of `/Flow-Arto/` → `/flow-studio/`

### docs/PREVIEW.md
**Total changes**: ~8-10 occurrences of URL updates

### README.md
**Action**: Create new file describing Flow Studio

---

## After Completion

- [ ] Delete this file: `POST_RENAME_CHECKLIST.md`
- [ ] Update `.claude/claude.md` to remove "Pending Post-Rename" section
- [ ] Continue development with clean foundation ✅

---

**GitHub Rename Behavior Notes**:
- GitHub automatically redirects old URLs (temporary)
- Git remote may auto-update or need manual update: `git remote set-url origin https://github.com/ricopoulos/flow-studio.git`
- Clone URLs will use new name immediately
