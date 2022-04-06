# Get Last version

### Description
This action looks for the latest version released and checks if it meets the following standards

- v1.0.0.1
- v1.0.0
- 1.0.0.1
- 1.0.0

### Example

```yml
uses: archaic10/get-last-tag@main
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
```