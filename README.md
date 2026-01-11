# Victory Calculator (ina-vicaL v2)

イナズマイレブン ヴィクトリーロード用 多機能計算機アプリ (React 版)

## 概要

従来の `ina-vicaL` (HTML/JS) をモダンな技術スタック (Vite + React + TypeScript) で再構築したプロジェクトです。
Google Drive 上の分析データ (`data/分析.csv`) を JSON に自動変換して取り込み、最新のステータスデータに基づいた計算が可能です。

## 技術スタック

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Data**: CSV (Excel) -> JSON Conversion (Python)

## 開発環境のセットアップ (GitHub 連携を含む)

**重要**: Google Drive 上で直接 Git を使用すると、同期の競合やパフォーマンス低下の原因になります。
GitHub で管理する場合は、以下の手順でローカル環境に移動させてください。

1. **フォルダの移動**:
   `victory-calc` フォルダを、Google Drive 管理外のローカルフォルダ（例: `C:\Projects\victory-calc`）にコピーします。

2. **依存関係のインストール**:

   ```bash
   cd victory-calc
   npm install
   ```

3. **開発サーバーの起動**:

   ```bash
   npm run dev
   ```

4. **GitHub へのプッシュ**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YourUsername/victory-calc.git
   git push -u origin main
   ```

## データの更新方法

`tools/convert_data.py` を使用して、CSV から最新の JSON を生成します。
※Python 環境が必要です (pandas インストール済みであること)。

```bash
python ../tools/convert_data.py
```

(注: フォルダ構成によっては、`convert_data.py` 内のパス調整が必要になる場合があります)
