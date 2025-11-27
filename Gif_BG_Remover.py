from PIL import Image

def remove_white_from_gif(input_path, output_path):
    # Load the GIF
    gif = Image.open(input_path)

    frames = []
    for frame in range(gif.n_frames):
        gif.seek(frame)

        # Convert to RGBA to support transparency
        rgba = gif.convert("RGBA")
        datas = rgba.getdata()

        new_data = []
        for item in datas:
            # item is (R, G, B, A)
            if item[0] > 250 and item[1] > 250 and item[2] > 250:
                # Make white transparent
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        rgba.putdata(new_data)
        frames.append(rgba)

    # Save output as GIF with transparency
    frames[0].save(
        output_path,
        save_all=True,
        append_images=frames[1:],
        transparency=0,
        disposal=2,
        loop=0
    )

    print("Saved:", output_path)


# Example usage:
remove_white_from_gif("images\loading.gif", "output_no_white.gif")
